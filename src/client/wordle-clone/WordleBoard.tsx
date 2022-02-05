/** @jsxImportSource @compiled/react */

import type { CellState, GameSate } from './types';

const WordleCell: React.FunctionComponent<CellState> = ({ letter, status }) => (
  <div
    css={[
      {
        backgroundColor: 'gray',
        border: '2px solid black',
        borderRadius: '5px',
        color: 'white',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.75rem',
        width: '50px',
        height: '50px',
        textShadow: '0 0 2px black',
        userSelect: 'none',
      },
      status === 'exact' && {
        backgroundColor: 'green',
      },
      status === 'partial' && {
        backgroundColor: 'yellow',
      },
    ]}
  >
    {letter}
  </div>
);

const WorldleRow: React.FunctionComponent<{ letters: CellState[] }> = ({
  letters,
}) => {
  const [first, second, third, fourth, fifth] = letters;
  return (
    <div
      css={{
        display: 'flex',
        gap: '5px',
        justifyContent: 'center',
        marginBottom: '5px',
      }}
    >
      <WordleCell {...first} />
      <WordleCell {...second} />
      <WordleCell {...third} />
      <WordleCell {...fourth} />
      <WordleCell {...fifth} />
    </div>
  );
};

const rows = [1, 2, 3, 4, 5, 6];
export const WordleBoard: React.FunctionComponent<{
  gameState: GameSate;
}> = ({ gameState }) => {
  return (
    <div css={{ margin: '0 auto' }}>
      {rows.map((row) => (
        <WorldleRow letters={gameState[row]} />
      ))}
    </div>
  );
};
