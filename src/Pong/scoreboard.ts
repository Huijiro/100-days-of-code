class Scoreboard extends Phaser.GameObjects.Group {
  rounds!: Phaser.GameObjects.Text;
  player1Score!: Phaser.GameObjects.Text;
  player2Score!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.data.set('rounds', 0);
    this.scene.data.set('player1Score', 0);
    this.scene.data.set('player2Score', 0);
  }

  create() {
    console.log('Scoreboard create');
    this.rounds = this.scene.add
      .text(
        +this.scene.game.config.width / 2,
        +this.scene.game.config.height / 8,
        'Round: 0',
        {
          fontSize: '64px',
          fontFamily: 'Arial',
          color: '#ffffff',
          align: 'center',
        },
      )
      .setOrigin(0.5, 0.5);

    this.player1Score = this.scene.add
      .text(
        +this.scene.game.config.width / 4,
        +this.scene.game.config.height / 2,
        '0',
        {
          fontSize: '64px',
          fontFamily: 'Arial',
          color: '#ffffff',
          align: 'center',
        },
      )
      .setOrigin(0.5, 0.5);

    this.player2Score = this.scene.add
      .text(
        (+this.scene.game.config.width * 3) / 4,
        +this.scene.game.config.height / 2,
        '0',
        {
          fontSize: '64px',
          fontFamily: 'Arial',
          color: '#ffffff',
          align: 'center',
        },
      )
      .setOrigin(0.5, 0.5);
  }

  update() {
    this.rounds.setText(`Round: ${this.scene.data.get('rounds')}`);
    this.player1Score.setText(`${this.scene.data.get('player1Score')}`);
    this.player2Score.setText(`${this.scene.data.get('player2Score')}`);
  }

  increaseRound() {
    this.scene.data.set('rounds', this.scene.data.get('rounds') + 1);
  }

  increasePlayer1Score() {
    this.scene.data.set(
      'player1Score',
      this.scene.data.get('player1Score') + 1,
    );
  }

  increasePlayer2Score() {
    this.scene.data.set(
      'player2Score',
      this.scene.data.get('player2Score') + 1,
    );
  }
}

export default Scoreboard;
