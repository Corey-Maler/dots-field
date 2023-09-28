import { Field } from './field';

export class Canv {
  private root: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  public x: number = 0;
  public y: number = 0;
  public get width() {
    return this.canvas.width;
  }

  public get height() {
    return this.canvas.height;
  }

  public get boundingRect() {
    return this.canvas.getBoundingClientRect();
  }

  constructor(
    div: HTMLDivElement,
    private bg: string = '#e2e2e2',
    private fg: string = '#666666'
  ) {
    this.root = div;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.root.appendChild(this.canvas);
    this.canvas.width = this.root.offsetWidth;
    this.canvas.height = this.root.offsetHeight;
    this.canvas.style.backgroundColor = bg;
    console.log('canvas');

    // move mouse move out
    // this.canvas.addEventListener('mousemove', this.mouseMove);
  }

  public handleMouseMove() {
    console.log('move me to the enginge');
    // this.canvas.addEventListener('mousemove', this.mouseMove);
  }

//   private mouseMove = (e: MouseEvent) => {
//     const rect = this.canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const dx = this.x - x;
//     const dy = this.y - y;
//     this.x = x;
//     this.y = y;

//     this.onImpact(x, y, dx, dy);
//   };

  public drawBegin() {
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.bg;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.fg;
    this.ctx.strokeStyle = this.fg;
  }

  public drawPoint(x: number, y: number, vecX: number, vecY: number) {
    this.ctx.moveTo(x, y);

    this.ctx.moveTo(x, y);

    const len = Math.sqrt(vecX * vecX + vecY * vecY);

    // looks ugly
    const thr = 20;
    if (len > thr) {
      vecX *= thr / len;
      vecY *= thr / len;
    }

    this.ctx.moveTo(x + vecX, y + vecY);
    this.ctx.arc(x + vecX, y + vecY, 1, 0, 2 * Math.PI);
  }

  public drawPoint2(x: number, y: number, vecX: number, vecY: number) {
    this.ctx.beginPath();
    // this.ctx.moveTo(x, y);
    // this.ctx.arc(x, y, 1, 0, 2 * Math.PI);

    // this.ctx.moveTo(x, y);

    const len = Math.sqrt(vecX * vecX + vecY * vecY);
    // don't even bother
    // if (len < 1) {
    //     return;
    // }

    // looks ugly
    const thr = 20;
    if (len > thr) {
      vecX *= thr / len;
      vecY *= thr / len;
    }
    // this.ctx.lineTo(x + vecX, y + vecY);

    this.ctx.moveTo(x + vecX, y + vecY);
    this.ctx.arc(x + vecX, y + vecY, 1, 0, 2 * Math.PI);

    const BG = 230;
    const FG = 120;
    const WW = BG - FG;
    const r = 230 - Math.min(Math.floor(Math.abs(len / 20) * WW), BG);
    this.ctx.fillStyle = `rgb(${r}, ${r}, ${r})`;

    // this.ctx.stroke();
    this.ctx.fill();
  }

  public drawEnd() {
    this.ctx.stroke();

    this.ctx.fill();
  }

  public drawA(x: number, y: number) {
    this.ctx.fillStyle = this.fg;
    this.ctx.moveTo(x, y);
    this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}
