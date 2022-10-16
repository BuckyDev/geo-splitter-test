import React from "react";
import { genArray } from "../../utils/genArray";
import { generateGOGrid } from "../Grid/generateGOGrid";

export default function Grid({ xMin, xMax, yMin, yMax, gridSize, zoom }) {
  // Compute horizontal grid lines
  const hArr = genArray(yMin, yMax, 1);
  const horizontalLines = hArr.map((val) => (
    <path
      stroke="gray"
      strokeWidth="1"
      d={`M${xMin * zoom * 10} ${10 * zoom * val} L${xMax * zoom * 10} ${
        10 * zoom * val
      } Z`}
    />
  ));

  // Compute vertical grid lines
  const vArr = genArray(xMin, xMax, 1);
  const verticalLines = vArr.map((val) => (
    <path
      stroke="gray"
      strokeWidth="1"
      d={`M${10 * zoom * val} ${yMin * zoom * 10} L${10 * zoom * val} ${
        yMax * zoom * 10
      } Z`}
    />
  ));

  // Compute grid tiles
  const gridTilesArray = generateGOGrid({
    equatorialTileSize: gridSize,
    mapHeight: yMax - yMin,
    mapWidth: xMax - xMin,
    latRatio: 4,
  });

  const gridTiles = gridTilesArray.map((gridTile) => (
    <path
      stroke="white"
      strokeWidth="2"
      fill="none"
      d={`M${10 * zoom * gridTile[0][0]} ${10 * zoom * gridTile[0][1]} L${
        10 * zoom * gridTile[1][0]
      } ${10 * zoom * gridTile[1][1]} L${10 * zoom * gridTile[2][0]} ${
        10 * zoom * gridTile[2][1]
      } L${10 * zoom * gridTile[3][0]} ${10 * zoom * gridTile[3][1]} Z`}
    />
  ));

  return horizontalLines.concat(verticalLines).concat(gridTiles);
}
