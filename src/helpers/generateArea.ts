import { Dot } from '../dots/Dot';

export const generateArea = (
  width: number,
  height: number,
  spacing: number,
  padding = 20,
  offset: {
    x: number;
    y: number;
  } = { x: 0, y: 0 }
) => {
  const dots: Dot<number>[] = [];
  const sizeW = (width - 2 * padding) / spacing;
  const sizeH = (height - 2 * padding) / spacing;
  const sp2 = spacing / 2 + padding; // half of spacing margin + paddings
  for (let i = 0; i < sizeW; i++) {
    for (let j = 0; j < sizeH; j++) {
      dots.push(
        new Dot(i * spacing + sp2 + offset.x, j * spacing + sp2 + offset.y, 0)
      );
    }
  }

  return dots;
};
