import Phaser from 'phaser';

import blue from './assets/blueSheet.png';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TheGame' });
  }

  preload() {
    this.load.image('blue-buttons', blue);
  }

  create() {
    const click = this.add.image(
      550,
      this.game.canvas.height / 2,
      'blue-buttons'
    );
    click.setCrop(0, 49, 190, 45);
    click
      .setInteractive(
        new Phaser.Geom.Rectangle(0, 49, 190, 45),
        Phaser.Geom.Rectangle.Contains
      )
      .on('pointerdown', () => {
        console.log('clicked');
      });
  }
}

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'the-game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [GameScene],
};

export const createGame = () => {
  return new Phaser.Game(config);
};
