import './style.css';
import { run } from './run.ts';
import { AnimatedText } from './built-in-effects/animated-text.ts';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  run(app);
} else {
  console.log('no app found');
}

const LoremIpsum = document.getElementById('lorem-ipsum');

const animatedText = new AnimatedText(LoremIpsum!, 'position');

animatedText.followMouse();