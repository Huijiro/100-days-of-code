interface BallConfig {
  size: number;
  speed: number;
  speedIncrease: number;
}

class Ball extends Phaser.Physics.Arcade.Sprite {
  speed: number;
  speedIncrease: number;
  size: number;

  constructor(scene: Phaser.Scene, x: number, y: number, config: BallConfig) {
    super(scene, x, y, 'ball');
    this.speed = config.speed;
    this.speedIncrease = config.speedIncrease;
    this.size = config.size;

    this.setOrigin(0.5, 0.5);
    this.generateTexture();
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setBounce(1);
    this.setVelocity(
      Phaser.Math.Between(-this.speed, this.speed),
      Phaser.Math.Between(-this.speed, this.speed),
    );
  }

  generateTexture() {
    if (this.scene.textures.exists('ball')) {
      this.setTexture('ball');
      return;
    }

    // Create a new texture
    const graphics = this.scene.make.graphics({});
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(this.size / 2, this.size / 2, this.size / 2);
    graphics.generateTexture('ball', this.size, this.size);

    this.setTexture('ball');
  }

  preUpdate() {
    // Increase the speed of the ball every frame
    this.setVelocity(
      this.body.velocity.x * this.speedIncrease,
      this.body.velocity.y * this.speedIncrease,
    );
  }
}

export default Ball;
