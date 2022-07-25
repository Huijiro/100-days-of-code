import Pong from './Pong';

new Phaser.Game({
  type: Phaser.WEBGL,
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
