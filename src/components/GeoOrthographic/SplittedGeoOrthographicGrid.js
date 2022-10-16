import React, { useMemo } from "react";
import { split } from "geo-splitter";
import { PropTypes } from "prop-types";
import * as d3 from "d3";

import Grid from "./Grid";
import { randomColor } from "../../utils/randomColor";

function SplittedGeoOrthographicGrid({
  data,
  xMin,
  xMax,
  yMin,
  yMax,
  gridSize,
  zoom,
}) {
  const splittedData = useMemo(
    () => split(data, xMin, xMax, yMin, yMax, gridSize),
    [data, xMin, xMax, yMin, yMax, gridSize]
  );

  const splittedSamplePolygons = useMemo(
    () =>
      splittedData.map((file) => {
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
    [splittedData, yMax, zoom]
  );

  const splittedSamplePoints = useMemo(
    () =>
      splittedData.map((file) =>
        file.features.map((feature) =>
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
        )
      ),
    [splittedData, yMax, zoom]
  );

  return (
    <svg height={(yMax - yMin) * 10 * zoom} width={(xMax - xMin) * 10 * zoom}>
      {splittedSamplePolygons}
      <Grid
        xMin={xMin}
        xMax={xMax}
        yMin={yMin}
        yMax={yMax}
        gridSize={gridSize}
        zoom={zoom}
      />
      {splittedSamplePoints}
    </svg>
  );
}

SplittedGeoOrthographicGrid.defaultProps = {
  zoom: 1,
};

SplittedGeoOrthographicGrid.propTypes = {
  zoom: PropTypes.number,
  data: PropTypes.object,
  xMin: PropTypes.string,
  xMax: PropTypes.string,
  yMin: PropTypes.string,
  yMax: PropTypes.string,
  gridSize: PropTypes.string,
};

export default SplittedGeoOrthographicGrid;
