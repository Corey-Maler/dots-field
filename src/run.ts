import { Engine } from '.';
import { Canv } from './canvas';
import { generateArea } from './dots/generateArea';

export const run = (
  container: HTMLDivElement,
  engine: Engine<HTMLSpanElement | number>
) => {
  const canvas = new Canv(container);
  const canvasRect = canvas.boundingRect;
  const xOffset = canvasRect.left;
  const yOffset = canvasRect.top;
  const dots = generateArea(canvas.width, canvas.height, 10, 0, {
    x: xOffset,
    y: yOffset,
  });
  engine.registerDots(dots);

  const render = () => {
    canvas.drawBegin();

    engine.dots.forEach((dot) => {
      if (typeof dot.ref === 'number') {
        canvas.drawPoint(dot.x - xOffset, dot.y - yOffset, dot.vecX, dot.vecY);
      }
    });

    canvas.drawEnd();
  };

  engine.addRenderer(render);
};
