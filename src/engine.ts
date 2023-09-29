import { Dot } from './dots/Dot';
import { Field } from './field';

export class Engine<T> {
  private mouse: [number, number] = [0, 0];
  private field = new Field<T>();
  public get dots() {
    return this.field.dots;
  }
  private run = false;
  private renders: Array<(dots: Dot<T>[]) => void> = [];
  constructor() {}

  public registerDots(dots: Dot<T>[]) {
    this.field.appendDots(dots);
  }

  public impact(x: number, y: number, fx: number, fy: number) {
    this.field.impact(x, y, fx, fy);
  }

  public followMouse(mouseOffset: { x: number; y: number }) {
    document.addEventListener('mousemove', (e) => {
      const rootX = mouseOffset.x;
      // temporary fix
      const rootY =
        mouseOffset.y - (document.body.parentElement?.scrollTop ?? 0);

      const x = e.clientX - rootX;
      const y = e.clientY - rootY;

      const dx = x - this.mouse[0];
      const dy = y - this.mouse[1];

      this.mouse = [x, y];
      const force = 1;

      this.impact(x, y, dx * force, dy * force);
    });

    this.startLoop();
  }

  public followMouseWithElement(element: HTMLElement) {
    element.addEventListener('touchstart', (e) => {
      e.preventDefault();
    })
    element.addEventListener('pointermove', (e) => {
      const rootX = element.offsetLeft;
      // temporary fix
      const rootY = element.offsetTop;

      const x = e.clientX - rootX;
      const y = e.clientY - rootY;

      const dx = x - this.mouse[0];
      const dy = y - this.mouse[1];

      this.mouse = [x, y];
      const force = 1;

      this.impact(x, y, dx * force, dy * force);
    });

    this.startLoop();
  }

  public addRenderer(renderer: (dots: Dot<T>[]) => void) {
    this.renders.push(renderer);
  }


  public explosion(x: number, y: number) {
    const dist = 400;
    const angle = Math.random() * Math.PI * 2;
    for (let i = 0; i < 100; i++) {
      const dx = Math.cos((angle * i) / 5) * dist;
      const dy = Math.sin((angle * i) / 5) * dist;
      setTimeout(() => {
        this.impact(x, y, dx / 100, dy / 100);
      }, i);
    }

    if (!this.run) {
      this.run = true;
      this.update();
      setTimeout(() => {
        this.run = false;
      }, 2000);
    }
  }

  private startLoop() {
    this.run = true;
    this.update();
  }

  private update = () => {
    if (this.run) {
      this.field.update();
      this.render();
      requestAnimationFrame(this.update);
    }
  };

  private render() {
    for (const dot of this.field.dots) {
      dot.render?.call(dot);
      // if (Math.abs(dot.vecX) < 0.1 && Math.abs(dot.vecY) < 0.1) {
      //   continue;
      // }
      // if (mode === 'position' || mode === 'color-position') {
      //   dot.ref.style.transform = `translate(${dot.vecX.toFixed(
      //     1
      //   )}px, ${dot.vecY.toFixed(1)}px)`;
      // }
      // if (mode === 'color' || mode === 'color-position') {
      //   const r = Math.min(Math.floor(Math.abs(dot.vecX) * 255), 255);
      //   const g = Math.min(Math.floor(Math.abs(dot.vecY) * 255), 255);
      //   const b = Math.min(Math.floor(Math.abs((dot.vecY + dot.vecX ) / 2) * 255), 255);
      //   dot.ref.style.color = `rgb(${r}, ${g}, ${r})`;
      // }
    }
    for (const renderer of this.renders) {
      renderer(this.field.dots);
    }
  }
}
