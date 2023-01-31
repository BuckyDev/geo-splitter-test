import { createSphericGrid } from "geo-splitter";
import React from "react";
import { randomColor } from "../../utils/randomColor";

export default function GridTiles({
  xMin,
  xMax,
  yMin,
  yMax,
  gridSize,
  latRatio,
  zoom,
}) {
  // Compute grid tiles
  const sphericGrid = createSphericGrid({
    gridSize,
    xStart: xMin,
    xEnd: xMax,
    yStart: yMin,
    yEnd: yMax,
    latRatio,
  });

  console.log(sphericGrid);

  return sphericGrid.map((tileGroup) => {
    const color = randomColor();
    return tileGroup.map((gridTile) => {
      const [initX, initY] = gridTile
        .split("_")
        .map((val) => parseFloat(val, 10));
      const path = `M${10 * zoom * initX} ${10 * zoom * initY} L${
        10 * zoom * initX
      } ${10 * zoom * (initY + gridSize)} L${10 * zoom * (initX + gridSize)} ${
        10 * zoom * (initY + gridSize)
      } L${10 * zoom * (initX + gridSize)} ${10 * zoom * initY} Z`;
      return <path fill={color} d={path} />;
    });
  });
}
