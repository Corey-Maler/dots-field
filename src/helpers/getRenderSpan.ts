import { Dot } from "../dots/Dot";

export function getRenderSpan(
  mode: 'color' | 'position' | 'color-position' = 'position'
) {
  function renderSpan(this: Dot<HTMLSpanElement>) {
    const dot = this;
    if (Math.abs(dot.vecX) < 0.1 && Math.abs(dot.vecY) < 0.1) {
      return;
    }
    if (mode === 'position' || mode === 'color-position') {
      dot.ref.style.transform = `translate(${dot.vecX.toFixed(
        1
      )}px, ${dot.vecY.toFixed(1)}px)`;
    }
    if (mode === 'color' || mode === 'color-position') {
      const r = Math.min(Math.floor(Math.abs(dot.vecX) * 255), 255);
      const g = Math.min(Math.floor(Math.abs(dot.vecY) * 255), 255);
      const b = Math.min(
        Math.floor(Math.abs((dot.vecY + dot.vecX) / 2) * 255),
        255
      );
      dot.ref.style.color = `rgb(${r}, ${g}, ${r})`;
    }
  }

  return renderSpan;
}
