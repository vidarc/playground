import { createContext, type Dispatch, useReducer } from 'react';

import { Keyboard } from './Keyboard';
import { WordleBoard } from './WordleBoard';
import type { GameSate, GameAction, CellState } from './types';

const initialState: GameSate = {
  currentRow: 1,
  answer: 'hello',
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
};

const processGuess = (row: CellState[], answer: string): CellState[] =>
  row.map((cell, index) => {
    if (cell.letter === answer[index]) {
      return { ...cell, status: 'exact' };
    } else if (answer.includes(cell.letter)) {
      return { ...cell, status: 'partial' };
    }
    return cell;
  });

const reducer = (state: GameSate, action: GameAction): GameSate => {
  switch (action.type) {
    case 'enter-letter':
      if (state[state.currentRow].length <= 4) {
        const cell: CellState = { letter: action.letter, status: 'normal' };
        return {
          ...state,
          [state.currentRow]: [...state[state.currentRow], cell],
        };
      }
      return state;
    case 'set-guess':
      if (state.currentRow >= 6) {
        return state;
      }

      return {
        ...state,
        [state.currentRow]: processGuess(state[state.currentRow], state.answer),
        currentRow: state.currentRow + 1,
      };
    default:
      throw new Error('unfound action type');
  }
};

export const StateDispatch = createContext<Dispatch<GameAction>>(
  () => undefined
);

const WordleClone = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  return (
    <>
      <StateDispatch.Provider value={dispatch}>
        <h2>Wordle Clone</h2>
        <WordleBoard gameState={state} />
        <Keyboard />
      </StateDispatch.Provider>
    </>
  );
};

export default WordleClone;
