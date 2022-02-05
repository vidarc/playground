import { createContext, type Dispatch, useReducer } from 'react';

import { Keyboard } from './Keyboard';
import { WordleBoard } from './WordleBoard';

export type GameSate = {
  currentRow: number;
  answer: string;
  [key: number]: string[];
};

type Action = { type: 'set-guess' } | { type: 'enter-letter'; letter: string };

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

const reducer = (state: GameSate, action: Action): GameSate => {
  console.log({ state, action });
  switch (action.type) {
    case 'enter-letter':
      if (state[state.currentRow].length <= 4) {
        return {
          ...state,
          [state.currentRow]: [...state[state.currentRow], action.letter],
        };
      }
      return state;
    case 'set-guess':
      if (state.currentRow >= 6) {
        return state;
      }
      return { ...state, currentRow: state.currentRow + 1 };
    default:
      throw new Error('unfound action type');
  }
};

export const StateDispatch = createContext<Dispatch<Action>>(() => undefined);

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
