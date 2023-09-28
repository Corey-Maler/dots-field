import { Dot } from "./dots/Dot";

interface FieldOptions {
  /**
   * Amount of "impacts" which gets remembered
   * Recommended value between 1000 and 10000
   */
  memorySize: number;
  /**
   * S
   * how long impact should live before being deleted
   */
  impactLifetime: number;
}

type Impact = [x: number, y: number, timestamp: number, fx: number, fy: number];

export class Field<T> {
  private opts: FieldOptions;
  public dots: Dot<T>[] = [];
  private impacts: Impact[] = [];
  public t: number = 0;
  constructor(opts: Partial<FieldOptions> = {}) {
    this.opts = { memorySize: 200, impactLifetime: 10, ...opts };
  }

  public appendDots(dots: Dot<T>[]) {
    this.dots.push(...dots);
  }

  public addDot(dot: Dot<T>) {
    this.dots.push(dot);
  }

  public x = 100;
  public y = 100;


  public impact(x: number, y: number, fx: number, fy: number) {
    const t = Date.now() / 1000;
    this.impacts.push([x, y, t, fx, fy]);
    while (this.impacts.length > this.opts.memorySize) {
      this.impacts.shift();
    }
  }

  public update() {
    const t = Date.now() / 1000;
    this.t = t;

    for (const dot of this.dots) {
      dot.reset();
    }

    const lifetime = this.opts.impactLifetime;
    const impacts = this.impacts;
    const dots = this.dots;

    for (const [ix, iy, it, fx, fy] of impacts) {
      const dt = t - it;
      if (dt > lifetime) {
        continue;
      }

      for (const dot of dots) {
        dot.update(ix, iy, [fx, fy], dt);
      }
    }
  }
}
