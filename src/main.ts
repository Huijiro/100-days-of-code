import Pong from './pong';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Pong],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
});
