class Goal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number) {
    super(scene, x, 0, 'goal');

    this.generateTexture();
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(1, +scene.game.config.height);
    this.setImmovable(true);
  }
  generateTexture() {
    if (this.scene.textures.exists('goal')) {
      this.setTexture('goal');
      return;
    }

    // Create a new texture
    const graphics = this.scene.make.graphics({});
    graphics.fillStyle(0xffffff, 0);
    graphics.fillRect(0, 0, 1024, 1024);
    graphics.generateTexture('goal', 16, 128);
    this.setTexture('goal');
  }
}

export default Goal;
