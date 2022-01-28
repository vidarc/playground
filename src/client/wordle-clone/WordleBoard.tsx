/** @jsxImportSource @compiled/react */

import { useState } from 'react';

type CellState = 'exact' | 'partial' | 'blank';

const WordleCell: React.FunctionComponent<{
  state: CellState;
}> = ({ state }) => (
  <div
    css={[
      state === 'exact' && {
        backgroundColor: 'green',
      },
      state === 'partial' && {
        backgroundColor: 'yellow',
      },
      state === 'blank' && {
        backgroundColor: 'gray',
      },
      {
        border: '2px solid black',
        borderRadius: '5px',
        width: '50px',
        height: '50px',
      },
    ]}
  />
);

const WordleCellWrapper = () => {
  const [state, setState] = useState<CellState>('blank');

  const handleClick = () => {
    setState((state) => {
      if (state === 'exact') {
        return 'partial';
      }
      if (state === 'partial') {
        return 'blank';
      }
      return 'exact';
    });
  };

  return (
    <div onClick={handleClick}>
      <WordleCell state={state} />
    </div>
  );
};

const WorldleRow = () => (
  <div
    css={{
      display: 'flex',
      gap: '5px',
      justifyContent: 'center',
      marginBottom: '5px',
    }}
  >
    <WordleCellWrapper />
    <WordleCellWrapper />
    <WordleCellWrapper />
    <WordleCellWrapper />
    <WordleCellWrapper />
  </div>
);

export const WordleBoard = () => (
  <div css={{ margin: '0 auto' }}>
    <WorldleRow />
    <WorldleRow />
    <WorldleRow />
    <WorldleRow />
    <WorldleRow />
    <WorldleRow />
  </div>
);
