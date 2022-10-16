import React, { useMemo } from "react";
import { PropTypes } from "prop-types";
import * as d3 from "d3";

import Grid from "./Grid";

function OriginalGeoOrthographicGrid({
  data,
  xMin,
  xMax,
  yMin,
  yMax,
  gridSize,
  zoom,
}) {
  const fullSamplePolygons = useMemo(
    () =>
      data.features.map((feature) =>
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
    [data.features, yMax, zoom]
  );

  const fullSamplePoints = useMemo(
    () =>
      data.features.map((feature) =>
        feature.geometry.coordinates.map((polygon) =>
          polygon.map((coord) => (
            <circle
              cx={coord[0] * 10 * zoom}
              cy={(yMax - coord[1]) * 10 * zoom}
              r="2"
              stroke="none"
              fill="white"
            />
          ))
        )
      ),
    [data.features, yMax, zoom]
  );

  return (
    <svg height={(yMax - yMin) * 10 * zoom} width={(xMax - xMin) * 10 * zoom}>
      {fullSamplePolygons}
      <Grid
        xMin={xMin}
        xMax={xMax}
        yMin={yMin}
        yMax={yMax}
        gridSize={gridSize}
        zoom={zoom}
      />
      {fullSamplePoints}
    </svg>
  );
}

OriginalGeoOrthographicGrid.defaultProps = {
  zoom: 1,
};

OriginalGeoOrthographicGrid.propTypes = {
  zoom: PropTypes.number,
  data: PropTypes.object,
  xMin: PropTypes.string,
  xMax: PropTypes.string,
  yMin: PropTypes.string,
  yMax: PropTypes.string,
  gridSize: PropTypes.string,
};

export default OriginalGeoOrthographicGrid;
