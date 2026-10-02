import { loadModel, search } from './engine';

const model = fetch('/connect4.bin').then((r) => r.arrayBuffer()).then(loadModel);

onmessage = async ({ data: { id, board, toPlay, simulations } }) => {
  postMessage({ id, ...search(await model, board, toPlay, simulations) });
};
