import Canvas from './canvas';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <h1>100 Days of Code by Huijiro</h1>
`;

const canvas = new Canvas(app);

canvas.animate(() => {});
