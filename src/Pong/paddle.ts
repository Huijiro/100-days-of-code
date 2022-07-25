import { Scene } from 'phaser';

interface PaddleConfig {
  upKey: Phaser.Input.Keyboard.Key;
  downKey: Phaser.Input.Keyboard.Key;
  speed: number;
}

class Paddle extends Phaser.Physics.Arcade.Sprite {
  upKey: Phaser.Input.Keyboard.Key;
  downKey: Phaser.Input.Keyboard.Key;
  speed: number;

  constructor(scene: Scene, x: number, y: number, config: PaddleConfig) {
    super(scene, x, y, 'paddle');
    this.setOrigin(0.5, 0.5);
    this.generateTexture();

    this.upKey = config.upKey;
    this.downKey = config.downKey;
    this.speed = config.speed;

    scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
  }

  generateTexture() {
    if (this.scene.textures.exists('paddle')) {
      this.setTexture('paddle');
      return;
    }

    // Create a new texture
    const graphics = this.scene.make.graphics({});
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(0, 0, 1024, 1024);
    graphics.generateTexture('paddle', 16, 128);

    this.setTexture('paddle');
  }

  preUpdate() {
    if (this.upKey.isDown) {
      this.y -= this.speed;
    } else if (this.downKey.isDown) {
      this.y += this.speed;
    }
  }
}

export default Paddle;
