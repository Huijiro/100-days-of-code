import './style.css';

import Canvas from './canvas';
import Vector2D from './vector2D';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <h1>Day 1. Canvas drawing and animating.</h1>
`;

const canvas = new Canvas(app);

const ball = new Vector2D(0, 0);

const direction = new Vector2D(1, 1);

canvas.animate(() => {
  ball.add(direction);
  canvas.drawPixel(ball.x, ball.y, 4);
  if (ball.x > canvas.width - 4 || ball.x < 0) {
    direction.x = -direction.x;
  }
  if (ball.y > canvas.height - 4 || ball.y < 0) {
    direction.y = -direction.y;
  }
});
