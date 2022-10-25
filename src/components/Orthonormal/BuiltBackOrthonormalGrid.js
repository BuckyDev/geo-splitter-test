import React, { useMemo } from "react";
import { split, mergeTiles } from "geo-splitter";
import { PropTypes } from "prop-types";

import * as d3 from "d3";
import Grid from "./Grid";

function BuiltBackOrthonormalGrid({
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

  const builtBack = useMemo(
    () => mergeTiles(splitted, gridSize),
    [splitted, gridSize]
  );
  console.log("data", data);
  console.log("builtBack", builtBack);

  const mergedPolygons = useMemo(
    () =>
      builtBack.features.map((feature) =>
        feature.geometry.coordinates.map((polygon) => {
          const path = d3.line()(
            polygon.map((coord) => [
              coord[0] * 10 * zoom,
              (yMax - coord[1]) * 10 * zoom,
            ])
          );
          return <path d={path} stroke="none" fill="#e2980c" />;
        })
      ),
    [builtBack.features, yMax, zoom]
  );

  const mergedPoints = useMemo(
    () =>
      builtBack.features.map((feature) =>
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
      ),
    [builtBack.features, yMax, zoom]
  );

  return (
    <svg height={(yMax - yMin) * 10 * zoom} width={(xMax - xMin) * 10 * zoom}>
      {mergedPolygons}
      <Grid
        xMin={xMin}
        xMax={xMax}
        yMin={yMin}
        yMax={yMax}
        gridSize={gridSize}
        zoom={zoom}
      />
      {renderPoints && mergedPoints}
    </svg>
  );
}

BuiltBackOrthonormalGrid.propTypes = {
  xMin: PropTypes.number,
  xMax: PropTypes.number,
  yMin: PropTypes.number,
  yMax: PropTypes.number,
  gridSize: PropTypes.number,
  data: PropTypes.object,
  zoom: PropTypes.number,
  renderPoints: PropTypes.bool,
};

BuiltBackOrthonormalGrid.defaultProps = {
  zoom: 1,
  renderPoints: true,
};

export default BuiltBackOrthonormalGrid;
