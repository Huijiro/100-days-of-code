export default class Canvas {
  canvas: any;
  ctx: any;
  width: any;
  height: any;
  constructor(div: HTMLDivElement) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    div.appendChild(this.canvas);
  }
}
