import React, { useMemo } from "react";
import { split } from "geo-splitter";
import { PropTypes } from "prop-types";

import * as d3 from "d3";
import Grid from "./Grid";
import { randomColor } from "../../utils/randomColor";

function SplittedOrthonormalGrid({
  xMin,
  xMax,
  yMin,
  yMax,
  data,
  renderPoints,
  zoom,
  gridSize,
}) {
  const splitted = useMemo(
    () => split(data, xMin, xMax, yMin, yMax, gridSize),
    [data, xMin, xMax, yMin, yMax, gridSize]
  );

  const splittedPolygons = useMemo(
    () =>
      splitted.map((file) => {
        const color = randomColor();
        return file.features.map((feature) =>
          feature.geometry.coordinates.map((polygon) => {
            const path = d3.line()(
              polygon.map((coord) => [
                coord[0] * 10 * zoom,
                (yMax - coord[1]) * 10 * zoom,
              ])
            );
            return <path d={path} stroke="none" fill={color} />;
          })
        );
      }),
    [splitted, yMax, zoom]
  );

  const splittedPoints = useMemo(
    () =>
      splitted.map((file) =>
        file.features.map((feature) =>
          feature.geometry.coordinates.map((polygon) =>
            polygon.map((coord) => (
              <circle
                cx={coord[0] * 10 * zoom}
                cy={(yMax - coord[1]) * 10 * zoom}
                r="4"
                stroke="none"
                fill="white"
              />
            ))
          )
        )
      ),
    [splitted, yMax, zoom]
  );

  return (
    <svg height={(yMax - yMin) * 10 * zoom} width={(xMax - xMin) * 10 * zoom}>
      {splittedPolygons}
      <Grid
        xMin={xMin}
        xMax={xMax}
        yMin={yMin}
        yMax={yMax}
        gridSize={gridSize}
        zoom={zoom}
      />
      {renderPoints && splittedPoints}
    </svg>
  );
}

SplittedOrthonormalGrid.propTypes = {
  xMin: PropTypes.number,
  xMax: PropTypes.number,
  yMin: PropTypes.number,
  yMax: PropTypes.number,
  gridSize: PropTypes.number,
  data: PropTypes.object,
  zoom: PropTypes.number,
  renderPoints: PropTypes.bool,
};

SplittedOrthonormalGrid.defaultProps = {
  zoom: 1,
  renderPoints: true,
};

export default SplittedOrthonormalGrid;
