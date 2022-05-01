/** @jsxImportSource @compiled/react */

import { useLayoutEffect } from 'react';

import { createGame } from './Game';

const GameEntry = () => {
  useLayoutEffect(() => {
    const game = createGame();

    return () => {
      game.destroy(true);
    };
  });

  return (
    <div>
      <h1>The Game</h1>
      <div id="the-game"></div>
    </div>
  );
};

export default GameEntry;
