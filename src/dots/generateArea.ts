import { Dot } from "./Dot";

export const generateArea = (width: number, height: number, spacing: number, padding = 20) => {
    const dots: Dot[] = [];
    const sizeW = (width - 2 * padding) / spacing;
    const sizeH = (height - 2 * padding) / spacing;
    const sp2 = spacing / 2 + padding; // half of spacing margin + paddings
    for (let i = 0; i < sizeW; i++) {
      for (let j = 0; j < sizeH; j++) {
        dots.push(new Dot(i * spacing + sp2, j * spacing + sp2));
      }
    }

    return dots;
}