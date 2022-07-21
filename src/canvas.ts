export default class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  constructor(div: HTMLDivElement) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    div.appendChild(this.canvas);
  }

  drawPixel(x: number, y: number) {
    this.ctx.fillRect(x, y, 4, 4);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  render(callback: Function) {
    this.clear();
    callback();
  }

  animate(callback: Function) {
    this.render(callback);
    requestAnimationFrame(() => this.animate(callback));
  }
}
