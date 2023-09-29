import { Dot } from '../dots/Dot';

export function getRenderSpan(
  mode: 'color' | 'position' | 'color-position' = 'position'
) {
  function renderSpan(this: Dot<HTMLSpanElement>) {
    const dot = this;
    if (Math.abs(dot.vecX) < 0.1 && Math.abs(dot.vecY) < 0.1) {
      return;
    }
    if (mode === 'position' || mode === 'color-position') {
      let vecX = dot.vecX;
      let vecY = dot.vecY;
      const len = Math.sqrt(vecX * vecX + vecY * vecY);
      const thr = 20;
      if (len > thr) {
        vecX *= thr / len;
        vecY *= thr / len;
      }
      dot.ref.style.transform = `translate(${vecX.toFixed(
        1
      )}px, ${vecY.toFixed(1)}px)`;
    }
    if (mode === 'color' || mode === 'color-position') {
        const scale = 0.1;
      const r = Math.min(Math.floor(Math.abs(dot.vecX * scale) * 255), 255);
      // const g = Math.min(Math.floor(Math.abs(dot.vecY * scale) * 255), 255);
      // const b = Math.min(
      //   Math.floor(Math.abs((dot.vecY + dot.vecX) / 2 * scale) * 255),
      //   255
      // );
      dot.ref.style.color = `rgb(${r}, ${r}, ${r})`;
    }
  }

  return renderSpan;
}
