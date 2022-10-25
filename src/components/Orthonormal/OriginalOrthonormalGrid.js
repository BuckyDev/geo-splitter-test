import React, { useMemo } from "react";
import { PropTypes } from "prop-types";

import * as d3 from "d3";
import Grid from "./Grid";

function OriginalOrthonormalGrid({
  xMin,
  xMax,
  yMin,
  yMax,
  data,
  extraLines,
  renderPoints,
  renderExtraLinePoints,
  zoom,
  gridSize,
  highlight,
  extraPoints,
}) {
  const polygons = useMemo(() => {
    if (!data) {
      return null;
    }
    return data.features.map((feature) =>
      feature.geometry.coordinates.map((polygon) => {
        const path = d3.line()(
          polygon.map((coord) => [
            coord[0] * 10 * zoom,
            (yMax - coord[1]) * 10 * zoom,
          ])
        );
        return <path d={path} stroke="none" fill="#e2980c" />;
      })
    );
  }, [data, yMax, zoom]);

  const points = useMemo(() => {
    if (!data || extraLines || !renderPoints) {
      return null;
    }
    return data.features.map((feature) =>
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
    );
  }, [data, extraLines, renderPoints, yMax, zoom]);

  const zone = useMemo(() => {
    if (!highlight) {
      return null;
    }
    const line = [
      [highlight.minX, highlight.minY],
      [highlight.minX, highlight.minY + gridSize],
      [highlight.minX + gridSize, highlight.minY + gridSize],
      [highlight.minX + gridSize, highlight.minY],
      [highlight.minX, highlight.minY],
    ];
    const path = d3.line()(
      line.map((coord) => [coord[0] * 10 * zoom, (yMax - coord[1]) * 10 * zoom])
    );
    return (
      <path d={path} stroke="rgb(31, 185, 108)" strokeWidth="2" fill="none" />
    );
  }, [gridSize, highlight, yMax, zoom]);

  const extraPointComponents = useMemo(() => {
    if (!extraPoints) {
      return null;
    }
    return extraPoints.map((coord) => (
      <circle
        cx={coord[0] * 10 * zoom}
        cy={(yMax - coord[1]) * 10 * zoom}
        r="6"
        stroke="white"
        fill="rgb(226, 152, 12)"
      />
    ));
  }, [extraPoints, yMax, zoom]);

  const extraLineComponents = useMemo(() => {
    if (!extraLines) {
      return null;
    }

    return extraLines.map((line) => {
      const path = d3.line()(
        line.map((coord) => [
          coord[0] * 10 * zoom,
          (yMax - coord[1]) * 10 * zoom,
        ])
      );
      return <path d={path} stroke="red" fill="none" />;
    });
  }, [extraLines, yMax, zoom]);

  const extraLinesPointComponents = useMemo(() => {
    if (!extraLines || !renderExtraLinePoints) {
      return null;
    }
    return extraLines.map((line) =>
      line.map((coord) => (
        <circle
          cx={coord[0] * 10 * zoom}
          cy={(yMax - coord[1]) * 10 * zoom}
          r="4"
          stroke="none"
          fill="white"
        />
      ))
    );
  }, [extraLines, renderExtraLinePoints, yMax, zoom]);

  return (
    <svg height={(yMax - yMin) * 10 * zoom} width={(xMax - xMin) * 10 * zoom}>
      {polygons}
      <Grid
        xMin={xMin}
        xMax={xMax}
        yMin={yMin}
        yMax={yMax}
        gridSize={gridSize}
        zoom={zoom}
      />
      {zone}
      {points}
      {extraLineComponents}
      {extraLinesPointComponents}
      {extraPointComponents}
    </svg>
  );
}

OriginalOrthonormalGrid.propTypes = {
  xMin: PropTypes.number,
  xMax: PropTypes.number,
  yMin: PropTypes.number,
  yMax: PropTypes.number,
  gridSize: PropTypes.number,
  highlight: PropTypes.object,
  data: PropTypes.object,
  extraLines: PropTypes.array,
  extraPoints: PropTypes.array,
  zoom: PropTypes.number,
  renderPoints: PropTypes.bool,
  renderExtraLinePoints: PropTypes.bool,
};

OriginalOrthonormalGrid.defaultProps = {
  zoom: 1,
  renderPoints: true,
  renderExtraLinePoints: true,
};

export default OriginalOrthonormalGrid;
