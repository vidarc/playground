import Phaser from 'phaser';

import soccer from './assets/SoccerBall.png';
import red from './assets/red.png';
import sky from './assets/sky.png';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('the game');
  }

  preload() {
    this.load.image('sky', sky);
    this.load.image('red', red);
    this.load.image('soccer', soccer);
  }

  create() {
    console.log('created');

    this.add.image(400, 300, 'sky');

    const particle = this.add.particles('red');
    const emitter = particle.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    });

    const soccerImage = this.physics.add.image(400, 300, 'soccer');
    soccerImage.setVelocity(100, 200);
    soccerImage.setBounce(1, 1);
    soccerImage.setCollideWorldBounds(true);

    emitter.startFollow(soccerImage);
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
  scene: GameScene,
};

export const createGame = () => {
  return new Phaser.Game(config);
};
