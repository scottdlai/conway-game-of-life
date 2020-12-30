import React, { useState } from 'react';
import Board from './Board';
import ParameterForm from './ParameterForm';

const DEFAULT_ROWS = 32;

const DEFAULT_COLS = 32;

const DEFAULT_SPEED = 100;

const Game = () => {
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [cols, setCols] = useState(DEFAULT_COLS);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  const createWorld = (r: number, c: number, s: number) => {
    setRows(r);
    setCols(c);
    setSpeed(s);
  };

  return (
    <>
      <h1>Game of Life</h1>
      <ParameterForm
        onSubmit={createWorld}
        defaultRows={DEFAULT_ROWS}
        defaultCols={DEFAULT_COLS}
        defaultSpeed={DEFAULT_SPEED}
      />
      <Board rows={rows} cols={cols} speed={speed} />
    </>
  );
};

export default Game;
