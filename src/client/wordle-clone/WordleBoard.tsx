/** @jsxImportSource @compiled/react */

import { GameSate } from './Wordle';

type CellState = 'exact' | 'partial' | 'blank';

const WordleCell: React.FunctionComponent<{
  state?: CellState;
}> = ({ state = 'blank', children }) => (
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
    ]}
  >
    {children}
  </div>
);

const WorldleRow: React.FunctionComponent<{ letters: string[] }> = ({
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
      <WordleCell>{first}</WordleCell>
      <WordleCell>{second}</WordleCell>
      <WordleCell>{third}</WordleCell>
      <WordleCell>{fourth}</WordleCell>
      <WordleCell>{fifth}</WordleCell>
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
