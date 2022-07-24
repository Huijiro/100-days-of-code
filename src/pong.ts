import { Scene } from 'phaser';

export default class Pong extends Scene {
  paddle1!: Phaser.GameObjects.Rectangle;
  paddle2!: Phaser.GameObjects.Rectangle;
  player1Score!: Phaser.GameObjects.Text;
  player2Score!: Phaser.GameObjects.Text;
  paddle1Physics!: { body: Phaser.Physics.Arcade.Body };
  paddle2Physics!: { body: Phaser.Physics.Arcade.Body };

  player1Up!: Phaser.Input.Keyboard.Key;
  player1Down!: Phaser.Input.Keyboard.Key;
  player2Up!: Phaser.Input.Keyboard.Key;
  player2Down!: Phaser.Input.Keyboard.Key;

  ball!: Phaser.GameObjects.Ellipse;
  ballPhysics!: { body: Phaser.Physics.Arcade.Body };

  rounds!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'Pong' });
  }

  create() {
    this.data.set('p1score', 0);
    this.data.set('p2score', 0);
    this.data.set('round', 1);

    this.rounds = this.add.text(+this.game.config.width / 2, 64, '', {
      fontSize: '64px',
      fontFamily: 'monospace',
      color: '#ffffff',
    });
    this.rounds.setOrigin(0.5, 0.5);

    this.rounds.setText(`Round ${this.data.get('round')}`);

    this.player1Score = this.add.text(64, 64, '', {
      fontSize: '64px',
      fontFamily: 'monospace',
      color: '#ffffff',
    });

    this.player1Score.setOrigin(0.5, 0.5);

    this.player1Score.setText(`${this.data.get('p1score')}`);

    this.player2Score = this.add.text(+this.game.config.width - 64, 64, '', {
      fontSize: '64px',
      fontFamily: 'monospace',
      color: '#ffffff',
    });
    this.player2Score.setOrigin(0.5, 0.5);
    this.player2Score.setText(`${this.data.get('p2score')}`);

    this.ball = this.add.ellipse(
      +this.game.config.width / 2,
      +this.game.config.height / 2,
      16,
      16,
      0xffffff,
    );

    this.paddle1 = this.add.rectangle(
      64,
      +this.game.config.height / 2,
      16,
      128,
      0xffffff,
    );

    this.paddle2 = this.add.rectangle(
      +this.game.config.width - 64,
      +this.game.config.height / 2,
      16,
      128,
      0xffffff,
    );

    this.paddle1Physics = this.physics.add.existing(this.paddle1) as {
      body: Phaser.Physics.Arcade.Body;
    };
    this.paddle2Physics = this.physics.add.existing(this.paddle2) as {
      body: Phaser.Physics.Arcade.Body;
    };

    this.paddle1Physics.body.setImmovable(true);
    this.paddle2Physics.body.setImmovable(true);

    this.ballPhysics = this.physics.add.existing(this.ball) as {
      body: Phaser.Physics.Arcade.Body;
    };

    this.ballPhysics.body.setBounce(1, 1);

    this.ballPhysics.body.setCollideWorldBounds(false);

    this.physics.add.collider(
      this.ball,
      this.paddle1,
      undefined,
      undefined,
      this,
    );

    this.physics.add.collider(
      this.ball,
      this.paddle2,
      undefined,
      undefined,
      this,
    );

    this.ballPhysics.body.setVelocity(Phaser.Math.Between(-200, 200), 200);

    this.paddle1Physics.body.setCollideWorldBounds(true);
    this.paddle2Physics.body.setCollideWorldBounds(true);

    this.player1Up = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W,
    );
    this.player1Down = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S,
    );

    this.player2Up = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP,
    );
    this.player2Down = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN,
    );
  }

  updateScoreBoard() {
    this.rounds.setText(`Round ${this.data.get('round')}`);
    this.player1Score.setText(`${this.data.get('p1score')}`);
    this.player2Score.setText(`${this.data.get('p2score')}`);
  }

  update() {
    if (this.player1Up.isDown) {
      this.paddle1Physics.body.setVelocityY(-300);
    } else if (this.player1Down.isDown) {
      this.paddle1Physics.body.setVelocityY(300);
    } else {
      this.paddle1Physics.body.setVelocityY(0);
    }

    if (this.player2Up.isDown) {
      this.paddle2Physics.body.setVelocityY(-300);
    } else if (this.player2Down.isDown) {
      this.paddle2Physics.body.setVelocityY(300);
    } else {
      this.paddle2Physics.body.setVelocityY(0);
    }

    if (this.ballPhysics.body.y > +this.game.config.height) {
      this.ballPhysics.body.setVelocityY(-200);
    }
    if (this.ballPhysics.body.y < 0) {
      this.ballPhysics.body.setVelocityY(200);
    }
    if (this.ballPhysics.body.x > +this.game.config.width) {
      this.data.set('p1score', this.data.get('p1score') + 1);
      this.data.set('round', this.data.get('round') + 1);
      this.ballPhysics.body.setVelocityX(-200);
      this.ballPhysics.body.reset(
        +this.game.config.width / 2,
        +this.game.config.height / 2,
      );
      this.ballPhysics.body.setVelocity(Phaser.Math.Between(-200, 200), 200);
      this.updateScoreBoard();
    }

    if (this.ballPhysics.body.x < 0) {
      this.data.set('p2score', this.data.get('p2score') + 1);
      this.data.set('round', this.data.get('round') + 1);
      this.ballPhysics.body.setVelocityX(200);
      this.ballPhysics.body.reset(
        +this.game.config.width / 2,
        +this.game.config.height / 2,
      );
      this.ballPhysics.body.setVelocity(Phaser.Math.Between(-200, 200), 200);
      this.updateScoreBoard();
    }
  }
}
