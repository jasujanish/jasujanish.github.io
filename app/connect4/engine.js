// Connect 4 board, the AlphaC4Zero network and MCTS, ported from github.com/jasujanish/Alpha40
// Boards are 42 cells in row-major order (row 0 is the top), 1 / -1 for the players and 0 for empty

const H = 6, W = 7, N = H * W;

export function drop(board, col, player) {
  const next = board.slice();
  for (let row = H - 1; row >= 0; row--) {
    if (!next[row * W + col]) {
      next[row * W + col] = player;
      return next;
    }
  }
}

export const legalMoves = (board) => [0, 1, 2, 3, 4, 5, 6].filter((col) => !board[col]);

export function winningCells(board, player) {
  for (let row = 0; row < H; row++)
    for (let col = 0; col < W; col++)
      for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
        const cells = [0, 1, 2, 3].map((i) => [row + i * dr, col + i * dc]);
        if (cells.every(([r, c]) => r >= 0 && r < H && c >= 0 && c < W && board[r * W + c] === player))
          return cells.map(([r, c]) => r * W + c);
      }
  return [];
}

const hasWon = (board, player) => winningCells(board, player).length > 0;

// Network, weights come from alphagozero/src/export_web.py with batchnorm already folded into the convs

export function loadModel(buffer) {
  const data = new Float32Array(buffer);
  let i = 0;
  const take = (n) => data.subarray(i, (i += n));
  const conv = (cin, cout, k) => ({ w: take(cout * cin * k * k), b: take(cout), cin, cout, k });
  const linear = (nin, nout) => ({ w: take(nout * nin), b: take(nout), nin, nout });

  const stem = conv(2, 32, 3);
  const blocks = Array.from({ length: 8 }, () => [conv(32, 32, 3), conv(32, 32, 3)]);
  const policy = [conv(32, 2, 1), linear(84, 7)];
  const value = [conv(32, 1, 1), linear(42, 32), linear(32, 1)];
  if (i !== data.length) throw new Error('weights do not match the model');
  return { stem, blocks, policy, value };
}

// Activations are (channels, 6, 7) flattened, the same layout as PyTorch, so flatten -> linear lines up
function conv({ w, b, cin, cout, k }, x) {
  const out = new Float64Array(cout * N), pad = (k - 1) / 2;
  for (let o = 0; o < cout; o++) {
    out.fill(b[o], o * N, (o + 1) * N);
    // Add each weight times the input shifted by its offset, only over the cells where the shift stays on the board
    for (let i = 0; i < cin; i++)
      for (let dr = 0; dr < k; dr++)
        for (let dc = 0; dc < k; dc++) {
          const weight = w[((o * cin + i) * k + dr) * k + dc];
          const shift = i * N + (dr - pad) * W + (dc - pad) - o * N;
          for (let r = Math.max(0, pad - dr); r < Math.min(H, H + pad - dr); r++)
            for (let c = Math.max(0, pad - dc), j = o * N + r * W + c; c < Math.min(W, W + pad - dc); c++, j++)
              out[j] += weight * x[j + shift];
        }
  }
  return out;
}

function linear({ w, b, nin, nout }, x) {
  const out = new Float32Array(nout);
  for (let o = 0; o < nout; o++) {
    let sum = b[o];
    for (let i = 0; i < nin; i++) sum += w[o * nin + i] * x[i];
    out[o] = sum;
  }
  return out;
}

const relu = (x) => x.map((v) => Math.max(v, 0));

// Move probabilities and value (1 = win, -1 = loss) for player, who is about to move
export function evaluate(model, board, player) {
  const x = new Float32Array(2 * N); // opponent plane, then player plane
  for (let j = 0; j < N; j++) {
    x[j] = board[j] === -player;
    x[N + j] = board[j] === player;
  }

  let h = relu(conv(model.stem, x));
  for (const [a, b] of model.blocks) {
    const y = conv(b, relu(conv(a, h)));
    h = y.map((v, j) => Math.max(v + h[j], 0));
  }

  const logits = linear(model.policy[1], relu(conv(model.policy[0], h)));
  const masked = Array.from(logits, (v, col) => (board[col] ? -Infinity : v)); // full columns get 0 probability
  const max = Math.max(...masked);
  const exps = masked.map((v) => Math.exp(v - max));
  const total = exps.reduce((a, b) => a + b);

  const [v1, v2, v3] = model.value;
  const value = Math.tanh(linear(v3, relu(linear(v2, relu(conv(v1, h)))))[0]);
  return { probs: exps.map((e) => e / total), value };
}

// MCTS, see alphagozero/src/mcts.py

class Node {
  constructor(board, toPlay) {
    this.board = board;
    this.toPlay = toPlay;
    this.moves = legalMoves(board);
    this.expanded = false;
    this.children = {};
    this.priors = Array(W).fill(0);
    this.visits = Array(W).fill(0); // N(s,a)
    this.results = Array(W).fill(0); // W(s,a)
  }
}

function select(model, node, cPuct) {
  if (hasWon(node.board, node.toPlay)) return 1;
  if (hasWon(node.board, -node.toPlay)) return -1;
  if (!node.moves.length) return 0;

  if (!node.expanded) {
    const { probs, value } = evaluate(model, node.board, node.toPlay);
    node.probs = probs;
    node.value = value;
    for (const move of node.moves) node.priors[move] = probs[move];
    node.expanded = true;
    return value;
  }

  const total = node.visits.reduce((a, b) => a + b);
  const puct = (move) => {
    const visits = node.visits[move];
    const mean = visits ? node.results[move] / visits : 0;
    return mean + (cPuct * node.priors[move] * Math.sqrt(total)) / (1 + visits);
  };

  // Use the prior to break ties, including when every visit count is zero
  let move = node.moves[0];
  for (const m of node.moves.slice(1)) {
    const [a, b] = [puct(m), puct(move)];
    if (a > b || (a === b && node.priors[m] > node.priors[move])) move = m;
  }

  node.children[move] ??= new Node(drop(node.board, move, node.toPlay), -node.toPlay);

  // The child returns its player's value, so reverse the perspective
  const value = -select(model, node.children[move], cPuct);
  node.visits[move] += 1;
  node.results[move] += value;
  return value;
}

// Most visited move, plus the network and search outputs for the position
export function search(model, board, toPlay, simulations, cPuct = 1) {
  const root = new Node(board, toPlay);
  for (let i = 0; i < simulations; i++) select(model, root, cPuct);

  let move = null;
  for (const m of root.moves) if (root.visits[m] > (move === null ? 0 : root.visits[move])) move = m;

  const total = root.visits.reduce((a, b) => a + b);
  return {
    move,
    network: root.probs,
    search: root.visits.map((v) => v / total),
    networkValue: root.value,
    searchValue: root.results[move] / root.visits[move],
  };
}
