import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface FormProp {
  onSubmit: (rows: number, cols: number, speed: number) => void;
  defaultRows: number;
  defaultCols: number;
  defaultSpeed: number;
}
const ParameterForm = ({
  onSubmit,
  defaultRows,
  defaultCols,
  defaultSpeed,
}: FormProp) => {
  const [rows, setRows] = useState<number>(defaultRows);
  const [cols, setCols] = useState<number>(defaultCols);
  const [speed, setSpeed] = useState<number>(defaultSpeed);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '1em',
        }}
      >
        <div>
          <Form.Label>Rows: {rows}</Form.Label>
          <Form.Control
            type='range'
            value={rows}
            placeholder='Number of rows'
            id='rowsInput'
            min={16}
            max={48}
            onChange={({ target: { value } }) => setRows(Number(value))}
          />
        </div>
        <div>
          <Form.Label>Columns: {cols}</Form.Label>
          <Form.Control
            type='range'
            value={cols}
            placeholder='Number of columns'
            id='colsInput'
            min={16}
            max={48}
            onChange={({ target: { value } }) => setCols(Number(value))}
          />
        </div>
        <div>
          <Form.Label>Speed per tick: {speed}</Form.Label>
          <Form.Control
            type='range'
            value={speed}
            placeholder='Speed per tick'
            id='speedInput'
            min={100}
            max={1000}
            step={100}
            onChange={({ target: { value } }) => setSpeed(Number(value))}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1em',
        }}
      >
        <Button
          variant='success'
          block
          onClick={() => onSubmit(rows, cols, speed)}
        >
          Create world
        </Button>
      </div>
    </>
  );
};

export default ParameterForm;
