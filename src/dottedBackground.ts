import { Canv } from './canvas';
import { generateArea } from './dots/generateArea';
import { Engine } from './engine';

export const makeDottedBackground = (scrollArea: HTMLDivElement) => {
  const eng = new Engine<number>();

  const canvas = new Canv(scrollArea);
  const dots = generateArea(canvas.width, canvas.height, 10);
  console.log('total amount of dots', dots.length);

  let box1 = document.querySelector('.box1')!;
  if (!box1) {
    throw new Error('no box1');
  }

  const boxes = Array.from(document.querySelectorAll('.box'));
  let boxesXY = boxes.map((box) => {
    const rect = box.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
      w: rect.width,
      h: rect.height,
    };
  });

  const impactForce = 1;

  eng.registerDots(dots);
  const upd = () => {
    boxes.forEach((box, i) => {
      const y1 = box.getBoundingClientRect().top;
      const { x, y, w, h } = boxesXY[i];
      const dy = y - y1;
      boxesXY[i].y = y1;

      // don't make impact if movement is too small
      if (Math.abs(dy) > 2) {
        if (dy > 0) {
          eng.impact(x, y, 0, dy * impactForce);
          eng.impact(x + w * 0.25, y, 0, dy * impactForce);
          eng.impact(x + w * 0.5, y, 0, dy * impactForce);
          eng.impact(x + w * 0.75, y, 0, dy * impactForce);
          eng.impact(x + w, y, 0, dy * impactForce);
        } else {
          eng.impact(x, y + h, 0, dy * impactForce);
          eng.impact(x + w * 0.25, y + h, 0, dy * impactForce);
          eng.impact(x + w * 0.5, y + h, 0, dy * impactForce);
          eng.impact(x + w * 0.75, y + h, 0, dy * impactForce);
          eng.impact(x + w, y + h, 0, dy * impactForce);
        }
      }
    });
    requestAnimationFrame(upd);
  };

  upd();

  const render = () => {
    canvas.drawBegin();

    dots.forEach((dot) => {
      canvas.drawPoint2(dot.x, dot.y, dot.vecX, dot.vecY);
    });

    // canvas.drawEnd();

    canvas.drawA(canvas.x, canvas.y);
    // setTimeout(upd, 100);
  };

  eng.addRenderer(render);
  eng.startLoop();
  console.log('engine started');
};
