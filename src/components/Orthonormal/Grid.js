import React from "react";
import { genArray } from "../../utils/genArray";

export default function Grid({ xMin, xMax, yMin, yMax, gridSize, zoom }) {
  // Compute horizontal grid lines
  const hArr = genArray(yMin, yMax, 1);
  const horizontalLines = hArr.map((val) => (
    <path
      stroke={val % gridSize === 0 ? "white" : "gray"}
      strokeWidth={val % gridSize === 0 ? "2" : "1"}
      d={`M${xMin * zoom * 10} ${10 * zoom * val} L${xMax * zoom * 10} ${
        10 * zoom * val
      } Z`}
    />
  ));

  // Compute vertical grid lines
  const vArr = genArray(xMin, xMax, 1);
  const verticalLines = vArr.map((val) => (
    <path
      stroke={val % gridSize === 0 ? "white" : "gray"}
      strokeWidth={val % gridSize === 0 ? "2" : "1"}
      d={`M${10 * zoom * val} ${yMin * zoom * 10} L${10 * zoom * val} ${
        yMax * zoom * 10
      } Z`}
    />
  ));

  return horizontalLines.concat(verticalLines);
}
