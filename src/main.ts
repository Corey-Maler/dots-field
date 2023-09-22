import './style.css';
import { run } from './run.ts';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  run(app);
} else {
  console.log('no app found');
}
