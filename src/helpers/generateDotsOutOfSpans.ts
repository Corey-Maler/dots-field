import { Dot } from '../dots/Dot';

export function generateDotsOutOfSpans(
  offsets: { x: number; y: number },
  spans: HTMLSpanElement[],
  render: Dot<HTMLSpanElement>['render']
) {
  const dots: Dot<HTMLSpanElement>[] = [];
  for (const span of spans) {
    const dot = new Dot(
      span.offsetLeft - offsets.x,
      span.offsetTop - offsets.y,
      span,
      render
    );
    dots.push(dot);
  }

  return dots;
}
