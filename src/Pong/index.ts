import { Scene } from 'phaser';
import Ball from './ball';
import Goal from './goal';
import Paddle from './paddle';
import Scoreboard from './scoreboard';

export default class Pong extends Scene {
  player1!: Paddle;
  player2!: Paddle;
  ball!: Ball;
  player1Goal!: Goal;
  player2Goal!: Goal;
  scoreboard!: Scoreboard;
  constructor() {
    super({ key: 'Pong' });
  }

  create() {
    this.player1 = new Paddle(this, 32, this.game.renderer.height / 2, {
      upKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      downKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      speed: 2,
    });

    this.player1Goal = new Goal(this, 0);

    this.player2 = new Paddle(
      this,
      this.game.renderer.width - 32,
      this.game.renderer.height / 2,
      {
        upKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
        downKey: this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.DOWN,
        ),
        speed: 2,
      },
    );

    this.player2Goal = new Goal(this, this.game.renderer.width);

    this.createBall();

    this.scoreboard = new Scoreboard(this);
    this.scoreboard.create();
  }

  createBall() {
    const ball = new Ball(
      this,
      this.game.renderer.width / 2,
      this.game.renderer.height / 2,
      {
        speed: 200,
        speedIncrease: 1.0001,
        size: 32,
      },
    );

    this.physics.add.collider(this.player1, ball);
    this.physics.add.collider(this.player2, ball);

    this.physics.add.collider(this.player1Goal, ball, this.goal as any);
    this.physics.add.collider(this.player2Goal, ball, this.goal as any);
  }

  goal = (goal: Goal, ball: Ball) => {
    if (goal === this.player1Goal) {
      this.scoreboard.increasePlayer2Score();
    } else {
      this.scoreboard.increasePlayer1Score();
    }

    this.scoreboard.increaseRound();
    this.scoreboard.update();
    ball.destroy();
    this.createBall();
  };
}
