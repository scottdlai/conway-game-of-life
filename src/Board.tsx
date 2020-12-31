import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

interface BoardProps {
  rows: number;
  cols: number;
  speed: number;
}

enum CellType {
  EMPTY,
  ALIVE,
}

const oppositeState = (t: CellType): CellType => {
  return t === CellType.EMPTY ? CellType.ALIVE : CellType.EMPTY;
};

const between = (n: number, l: number, u: number) => l <= n && n < u;

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const ALIVE_RATE = 0.35;

const randomCell = () =>
  Math.random() < ALIVE_RATE ? CellType.ALIVE : CellType.EMPTY;

const Board = ({ rows, cols, speed }: BoardProps) => {
  const [grid, setGrid] = useState<CellType[][]>(
    Array(rows).fill(Array(cols).fill(CellType.EMPTY))
  );

  useEffect(() => {
    setGrid(Array(rows).fill(Array(cols).fill(CellType.EMPTY)));
  }, [rows, cols, speed]);

  const [simulating, setSimulating] = useState(false);

  const toggleCell = (r: number, c: number) =>
    setGrid(
      grid.map((row, i) =>
        row.map((cell, j) => (i === r && j === c ? oppositeState(cell) : cell))
      )
    );

  const inGrid = (r: number, c: number) =>
    between(r, 0, rows) && between(c, 0, cols);

  const rules = (cell: CellType, alives: number) => {
    if (cell === CellType.ALIVE && (alives === 2 || alives === 3)) {
      return CellType.ALIVE;
    } else if (cell === CellType.EMPTY && alives === 3) {
      return CellType.ALIVE;
    } else {
      return CellType.EMPTY;
    }
  };

  const getNeighborsOf = (r: number, c: number) => {
    const neighbors: CellType[] = [];

    for (const [dr, dc] of directions) {
      if (inGrid(r + dr, c + dc)) {
        neighbors.push(grid[r + dr][c + dc]);
      }
    }
    return neighbors;
  };

  const sameGrid = (newGrid: CellType[][]) => {
    for (let r = 0; r < rows; ++r) {
      for (let c = 0; c < cols; ++c) {
        if (grid[r][c] !== newGrid[r][c]) {
          return false;
        }
      }
    }
    return true;
  };

  const tick = () => {
    const newGrid: CellType[][] = [];
    for (let r = 0; r < rows; ++r) {
      const newRow: CellType[] = [];
      for (let c = 0; c < cols; ++c) {
        const neighbors = getNeighborsOf(r, c);
        const liveCount = neighbors.filter(
          (neighbor) => neighbor === CellType.ALIVE
        ).length;

        newRow.push(rules(grid[r][c], liveCount));
      }
      newGrid.push(newRow);
    }
    // Compare to previous tick
    // If they are the same then stop the simulation
    if (sameGrid(newGrid)) {
      setSimulating(false);
    }
    setGrid(newGrid);
  };

  const clearGrid = () =>
    setGrid(grid.map((row) => row.map(() => CellType.EMPTY)));

  const randomize = () => setGrid(grid.map((row) => row.map(randomCell)));

  useEffect(() => {
    const simulation = setTimeout(() => {
      if (!simulating) {
        return;
      }
      tick();
    }, speed);

    return () => clearTimeout(simulation);
  }, [simulating, grid]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '1em',
        }}
      >
        <Button onClick={() => setSimulating(!simulating)}>
          {simulating ? 'Stop' : 'Start'}
        </Button>
        <Button
          disabled={simulating}
          variant='danger'
          onClick={() => clearGrid()}
        >
          Clear
        </Button>
        <Button
          disabled={simulating}
          variant='info'
          onClick={() => randomize()}
        >
          Random
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 20px)`,
          }}
        >
          {grid.map((row, r) =>
            row.map((col: CellType, c: number) => (
              <div
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: col === CellType.EMPTY ? 'white' : '#13669c',
                  border: '1px solid black',
                }}
                key={`${r}, ${c}`}
                onClick={() => {
                  if (simulating) {
                    return;
                  }
                  toggleCell(r, c);
                }}
              ></div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Board;
