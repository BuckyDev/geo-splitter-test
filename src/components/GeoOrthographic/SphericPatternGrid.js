import React from "react";
import { PropTypes } from "prop-types";

import GridTiles from "./GridTiles";

function SphericPatternGrid({
  xMin,
  xMax,
  yMin,
  yMax,
  gridSize,
  zoom,
  latRatio,
}) {
  return (
    <svg
      height={(yMax - yMin) * 10 * zoom}
      width={(xMax - xMin) * 10 * zoom}
      viewBox={`${xMin * 10 * zoom} ${yMin * 10 * zoom} ${
        (xMax - xMin) * 10 * zoom
      } ${(yMax - yMin) * 10 * zoom}`}
    >
      <GridTiles
        xMin={xMin}
        xMax={xMax}
        yMin={yMin}
        yMax={yMax}
        gridSize={gridSize}
        zoom={zoom}
        latRatio={latRatio}
      />
    </svg>
  );
}

SphericPatternGrid.defaultProps = {
  zoom: 1,
};

SphericPatternGrid.propTypes = {
  zoom: PropTypes.number,
  xMin: PropTypes.string,
  xMax: PropTypes.string,
  yMin: PropTypes.string,
  yMax: PropTypes.string,
  latRatio: PropTypes.number,
  gridSize: PropTypes.string,
};

export default SphericPatternGrid;
