import './style.css';
import { run } from './run.ts';
import { Engine } from './engine.ts';
import { wrapEachWordInSpan } from './helpers/wrapEachWordIntoSpan.ts';
import { generateDotsOutOfSpans } from './helpers/generateDotsOutOfSpans.ts';
import { Dot } from './dots/Dot.ts';
import { getRenderSpan } from './helpers/getRenderSpan.ts';
import { Field } from './field.ts';
import { Canv } from './canvas.ts';
import { generateArea } from './dots/generateArea.ts';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  run(app);
} else {
  console.log('no app found');
}

const mode: 'color' | 'position' | 'color-position' = 'position';

const loremIpsumAnimation = new Engine<HTMLSpanElement>();

const LoremIpsum = document.getElementById('lorem-ipsum');
if (LoremIpsum) {
  const liOffset = LoremIpsum?.getBoundingClientRect();
  const offset = { x: liOffset!.left, y: liOffset!.top };

  const loremIpsumSpans = wrapEachWordInSpan(LoremIpsum!);
  const loremIpsumDots = generateDotsOutOfSpans(
    offset,
    loremIpsumSpans,
    getRenderSpan('color-position')
  );

  loremIpsumAnimation.registerDots(loremIpsumDots);
  // loremIpsumAnimation.followMouse(offset);
}

const scrollArea: HTMLDivElement | null = document.querySelector('.bg-canvas');

if (scrollArea) {
  const field = new Field<number>();

  const canvas = new Canv(scrollArea, field.impact.bind(field));
  const dots = generateArea(canvas.width, canvas.height, 5);
  console.log('total amount of dots', dots.length);

  let box1 = document.querySelector('.box1')!;
  if (!box1) {
    throw new Error('no box1');
  }

  let yy = box1.getBoundingClientRect().top;
  let xx = box1.getBoundingClientRect().left;
  const xw = box1.getBoundingClientRect().width;
  const yh = box1.getBoundingClientRect().height;
  const impactForce = 1;

  let lastUpdate = Date.now();

  field.appendDots(dots);
  const upd = () => {
    const y1 = box1.getBoundingClientRect().top;
    const dy = yy - y1;
    yy = y1;

    // don't make impact if movement is too small
    if (Math.abs(dy) > 2) {
      if (lastUpdate + 100 < Date.now()) {
        lastUpdate = Date.now();
        if (dy > 0) {
          field.impact(xx, yy, 0, dy * impactForce);
          field.impact(xx + xw * 0.25, yy, 0, dy * impactForce);
          field.impact(xx + xw * 0.5, yy, 0, dy * impactForce);
          field.impact(xx + xw * 0.75, yy, 0, dy * impactForce);
          field.impact(xx + xw, yy, 0, dy * impactForce);
        } else {
          field.impact(xx, yy + yh, 0, dy * impactForce);
          field.impact(xx + xw * 0.25, yy + yh, 0, dy * impactForce);
          field.impact(xx + xw * 0.5, yy + yh, 0, dy * impactForce);
          field.impact(xx + xw * 0.75, yy + yh, 0, dy * impactForce);
          field.impact(xx + xw, yy + yh, 0, dy * impactForce);
        }
      }
    }

    field.update();
    canvas.drawBegin();

    field.dots.forEach((dot) => {
      canvas.drawPoint2(dot.x, dot.y, dot.vecX, dot.vecY);
    });

    // canvas.drawEnd();

    canvas.drawA(canvas.x, canvas.y);
    requestAnimationFrame(upd);
    // setTimeout(upd, 100);
  };

  upd();
}
