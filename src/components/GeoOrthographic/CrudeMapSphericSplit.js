import React, { useMemo, useState } from "react";
import * as d3 from "d3";
import { sphericSplit, split } from "geo-splitter";
import { randomColor } from "../../utils/randomColor";

export default function CrudeMapSphericSplit({
  xMin,
  xMax,
  yMin,
  yMax,
  data,
  latRatio,
  zoom,
  gridSize,
}) {
  const [splitError, setSplitError] = useState(false);
  const [hasSplit, setHasSplit] = useState(false);

  const sphericSplitData = useMemo(() => {
    try {
      const splitTiles = sphericSplit({
        xStart: xMin,
        xEnd: xMax,
        yStart: yMin,
        yEnd: yMax,
        latRatio,
        data,
        gridSize,
      });
      setHasSplit(true);
      return splitTiles;
    } catch (e) {
      console.log(e);
      setSplitError(true);
      setHasSplit(true);
      return undefined;
    }
  }, [xMin, xMax, yMin, yMax, latRatio, data, gridSize]);

  const splitData = useMemo(
    () => split(data, xMin, xMax, yMin, yMax, gridSize),
    [data, xMin, xMax, yMin, yMax, gridSize]
  );

  const polygons = useMemo(() => {
    if (splitError || !hasSplit) {
      return undefined;
    }
    return sphericSplitData.map((featureCollection) => {
      const color = randomColor();
      return featureCollection.features.map((feature) =>
        feature.geometry.coordinates.map((polygon) => {
          const path = d3.line()(
            polygon.map((coord) => [
              coord[0] * 10 * zoom,
              (yMax + yMin - coord[1]) * 10 * zoom,
            ])
          );
          return <path d={path} stroke="none" fill={color} />;
        })
      );
    });
  }, [splitError, hasSplit, sphericSplitData, zoom, yMax, yMin]);

  const originalPolygons = useMemo(
    () =>
      data.features.map((feature) =>
        feature.geometry.coordinates.map((polygon) => {
          const path = d3.line()(
            polygon.map((coord) => [
              coord[0] * 10 * zoom,
              (yMax + yMin - coord[1]) * 10 * zoom,
            ])
          );
          return <path d={path} stroke="none" fill="white" />;
        })
      ),
    [data.features, zoom, yMax, yMin]
  );

  const splitPolygons = useMemo(
    () =>
      splitData.map((file) =>
        file.features.map((feature) =>
          feature.geometry.coordinates.map((polygon) => {
            const path = d3.line()(
              polygon.map((coord) => [
                coord[0] * 10 * zoom,
                (yMax + yMin - coord[1]) * 10 * zoom,
              ])
            );
            return <path d={path} stroke="none" fill="red" />;
          })
        )
      ),
    [splitData, yMax, yMin, zoom]
  );

  return (
    <svg
      height={(yMax - yMin) * 10 * zoom}
      width={(xMax - xMin) * 10 * zoom}
      viewBox={`${xMin * 10 * zoom} ${yMin * 10 * zoom} ${
        (xMax - xMin) * 10 * zoom
      } ${(yMax - yMin) * 10 * zoom}`}
    >
      {originalPolygons}
      {splitPolygons}
    </svg>
  );
}
