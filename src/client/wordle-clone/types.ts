export type CellState = {
  letter: string;
  status: 'normal' | 'partial' | 'exact';
};

export type GameSate = {
  currentRow: number;
  answer: string;
  [key: number]: CellState[];
};

export type GameAction =
  | { type: 'set-guess' }
  | { type: 'enter-letter'; letter: string };
