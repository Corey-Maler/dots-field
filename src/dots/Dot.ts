const c = 38;
const c1 = 2;
const c2 = 0.1;

function clamMin(x: number, w = 10) {
    if (x > 0 && x < w) {
      return w;
    }
    if (x < 0 && x > -w) {
      return -w;
    }
    return x;
  }

export class Dot<T> {
  public x: number;
  public y: number;
  public readonly ref: T;

  public vecX: number = 0;
  public vecY: number = 0;

  public t = 0;

  constructor(xOr: number, yOr: number, ref: T) {
    this.x = xOr;
    this.y = yOr;
    this.ref = ref;
  }

  update(mx: number, my: number, a: [number, number], dt: number) {
    // console.log(dt);
    const { x, y } = this;
    const e = -5e1;
    let dx = clamMin(x - mx, 2);
    let dy = clamMin(y - my, 2);

    const r = Math.sqrt(dx * dx + dy * dy);
    const f = e / r;

    const [ax, ay] = a;

    // Math.pow for negative numbers return NaN (unexpected), so we pick
    // good enough approximation for visuals
    const pow = Math.pow(10, 1 - Math.abs((dt / c2 - r / c) / c1)) / 10;
    const gx = ax * pow;
    const gy = ay * pow;
    // console.log(gy, r, dt, c);

    const fx = f * gx;
    const fy = f * gy;
    this.vecX += fx;
    this.vecY += fy;
  }

  reset() {
    this.vecX = 0;
    this.vecY = 0;
  }
}
