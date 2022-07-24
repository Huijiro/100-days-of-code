import './style.css';

import Canvas from './canvas';
import Vector2D from './vector2D';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <h1>Day 2. Input handling.</h1>
`;

const canvas = new Canvas(app);

const ball = new Vector2D(0, 0);

const direction = new Vector2D(0, 0);

canvas.animate(() => {
  canvas.drawPixel(ball.x, ball.y, 4);

  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        direction.y = -1;
        break;
      case 'ArrowDown':
        direction.y = 1;
        break;
      case 'ArrowLeft':
        direction.x = -1;
        break;
      case 'ArrowRight':
        direction.x = 1;
        break;
    }
  });

  window.addEventListener('keyup', () => {
    direction.reset();
  });

  ball.add(direction);
});
