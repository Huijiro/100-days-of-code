export default class Vector2D {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(vector: Vector2D) {
    this.x += vector.x;
    this.y += vector.y;
  }
}
