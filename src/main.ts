import './style.css';
import { run } from './run.ts';
import { Engine } from './engine.ts';
import { wrapEachWordInSpan } from './helpers/wrapEachWordIntoSpan.ts';
import { generateDotsOutOfSpans } from './helpers/generateDotsOutOfSpans.ts';
import { getRenderSpan } from './helpers/getRenderSpan.ts';

const app = document.querySelector<HTMLDivElement>('#app');

const mainEngine = new Engine<HTMLSpanElement | number>();

mainEngine.followMouseWithElement(app! as any);

const LoremIpsum = document.getElementById('lorem-ipsum');
if (LoremIpsum) {
  const offset = { x: 0, y: 0};

  const loremIpsumSpans = wrapEachWordInSpan(LoremIpsum!);
  const loremIpsumDots = generateDotsOutOfSpans(
    offset,
    loremIpsumSpans,
    getRenderSpan('color')
  );

  mainEngine.registerDots(loremIpsumDots);
}

if (app) {
  run(app, mainEngine);
} else {
  console.log('no app found');
}
