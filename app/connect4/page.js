'use client';

import { useEffect, useRef, useState } from 'react';
import { drop, legalMoves, winningCells } from './engine';
import styles from './connect4.module.css';

const SIMULATIONS = 200;
const EMPTY = Array(42).fill(0);

export default function Connect4() {
  const worker = useRef(null);
  const requests = useRef(0);
  const [human, setHuman] = useState(1); // 1 moves first
  const [history, setHistory] = useState([]); // columns played
  const [stats, setStats] = useState(null); // search output for the model's last move

  const board = history.reduce((b, col, i) => drop(b, col, i % 2 ? -1 : 1), EMPTY);
  const toPlay = history.length % 2 ? -1 : 1;
  const win = winningCells(board, -toPlay);
  const over = win.length > 0 || legalMoves(board).length === 0;
  const last = history.length ? board.findIndex((v, j) => v && j % 7 === history.at(-1)) : -1;

  useEffect(() => {
    worker.current = new Worker(new URL('./worker.js', import.meta.url));
    return () => worker.current.terminate();
  }, []);

  // Ask the worker for a move whenever it is the model's turn, ignoring replies from earlier games
  useEffect(() => {
    if (over || toPlay === human) return;
    const id = ++requests.current;
    worker.current.onmessage = ({ data }) => {
      if (data.id !== requests.current) return;
      setStats(data);
      setHistory((h) => [...h, data.move]);
    };
    worker.current.postMessage({ id, board, toPlay, simulations: SIMULATIONS });
  }, [history, human]); // eslint-disable-line react-hooks/exhaustive-deps

  function newGame(first) {
    requests.current++;
    setHuman(first);
    setHistory([]);
    setStats(null);
  }

  function play(col) {
    if (!over && toPlay === human && !board[col]) setHistory([...history, col]);
  }

  const status = win.length ? (-toPlay === human ? 'You won' : 'The model won')
    : over ? 'Draw'
    : toPlay === human ? 'Your turn' : 'Model is thinking…';
  const color = (player) => (player === human ? styles.human : styles.model);

  return (
    <main className={styles.page}>
      <h1>Connect 4</h1>
      <p>
        Play against an <a href="https://github.com/jasujanish/Alpha40">AlphaGo Zero style model</a> I trained from self-play.
        It runs {SIMULATIONS} MCTS simulations per move, in your browser.
      </p>

      <div className={styles.controls}>
        <span className={styles.status}>
          <span className={`${styles.dot} ${over && !win.length ? '' : color(over ? -toPlay : toPlay)}`} />
          {status}
        </span>
        <span>
          <button className={human === 1 ? styles.selected : ''} onClick={() => newGame(1)}>You first</button>
          <button className={human === -1 ? styles.selected : ''} onClick={() => newGame(-1)}>Model first</button>
        </span>
      </div>

      <div className={styles.game}>
        <div className={styles.board}>
          {[0, 1, 2, 3, 4, 5, 6].map((col) => (
            <button key={col} className={styles.column} onClick={() => play(col)}
              disabled={over || toPlay !== human || board[col] !== 0} aria-label={`Column ${col + 1}`}>
              {[0, 1, 2, 3, 4, 5].map((row) => {
                const j = row * 7 + col;
                return (
                  <span key={row} className={[styles.cell, board[j] && color(board[j]),
                    win.includes(j) && styles.win, j === last && !win.length && styles.last].filter(Boolean).join(' ')} />
                );
              })}
            </button>
          ))}
        </div>

        <div className={styles.sidebar}>
          <section>
            <h2>Model&apos;s move</h2>
            <div className={styles.legend}>
              <span><i className={styles.network} />Network</span>
              <span><i className={styles.search} />Search</span>
            </div>
            {[0, 1, 2, 3, 4, 5, 6].map((col) => (
              <div key={col} className={`${styles.row} ${stats?.move === col ? styles.chosen : ''}`}>
                <span>{col + 1}</span>
                <span className={styles.bars}>
                  <i className={styles.network} style={{ width: `${100 * (stats?.network[col] ?? 0)}%` }} />
                  <i className={styles.search} style={{ width: `${100 * (stats?.search[col] ?? 0)}%` }} />
                </span>
                <span>{stats ? `${(100 * stats.network[col]).toFixed(0)}%` : '–'}</span>
                <span>{stats ? `${(100 * stats.search[col]).toFixed(0)}%` : '–'}</span>
              </div>
            ))}
          </section>

          <section>
            <h2>Model evaluation</h2>
            {[['Network', stats?.networkValue], ['Search', stats?.searchValue]].map(([name, value]) => (
              <div key={name} className={styles.value}>
                <span>{name}</span>
                <span className={styles.track}>
                  {value !== undefined && (
                    <i className={value >= 0 ? styles.good : styles.bad}
                      style={{ left: `${50 + Math.min(value, 0) * 50}%`, width: `${Math.abs(value) * 50}%` }} />
                  )}
                </span>
                <span>{value === undefined ? '–' : `${value >= 0 ? '+' : ''}${value.toFixed(2)}`}</span>
              </div>
            ))}
            <div className={styles.scale}><span>Loss</span><span>Draw</span><span>Win</span></div>
          </section>
        </div>
      </div>
    </main>
  );
}
