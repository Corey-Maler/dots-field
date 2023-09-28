import { Canv } from './canvas';
import { generateArea } from './dots/generateArea';
import { Field } from './field';

export const run = (container: HTMLDivElement) => {
  const field = new Field();
  const canvas = new Canv(container, field.impact.bind(field));
  canvas.handleMouseMove();
  const dots = generateArea(canvas.width, canvas.height, 10, 0);
  field.appendDots(dots);
  const upd = () => {
    field.update();
    canvas.drawBegin();

    field.dots.forEach((dot) => {
      canvas.drawPoint(dot.x, dot.y, dot.vecX, dot.vecY);
    });

    canvas.drawEnd();

    canvas.drawA(canvas.x, canvas.y);
    requestAnimationFrame(upd);
    // setTimeout(upd, 100);
  };

  upd();
};
