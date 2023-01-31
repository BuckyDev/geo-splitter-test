import React, { useMemo, useState } from "react";
import { split, mergeTiles } from "geo-splitter";
import { PropTypes } from "prop-types";

import * as d3 from "d3";
import Grid from "./Grid";
import { groupSplit } from "../../utils/groupSplit";
import { randomColor } from "../../utils/randomColor";

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
  const [mergeError, setMergeError] = useState(false);
  const [hasMerged, setHasMerged] = useState(false);
  const splitted = useMemo(
    () => split(data, xMin, xMax, yMin, yMax, gridSize),
    [data, xMin, xMax, yMin, yMax, gridSize]
  );

  const groupedSplit = useMemo(
    () =>
      groupSplit({
        splitData: splitted,
        xMin,
        xMax,
        yMin,
        yMax,
        gridSize,
      }),
    [splitted, xMin, xMax, yMin, yMax, gridSize]
  );

  const builtBack = useMemo(() => {
    try {
      const mergedTiles = groupedSplit.map((splitGroup) =>
        mergeTiles(splitGroup, gridSize)
      );
      setHasMerged(true);
      return mergedTiles;
    } catch (e) {
      console.log(e);
      setMergeError(true);
      setHasMerged(true);
      return undefined;
    }
  }, [groupedSplit, gridSize]);
  console.log({ splitGroup: groupedSplit[7], splitted, builtBack });

  const mergedPolygons = useMemo(() => {
    if (mergeError || !hasMerged) {
      return undefined;
    }
    return builtBack.map((featureCollection) => {
      const color = randomColor();
      return featureCollection.features.map((feature) =>
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
    });
  }, [builtBack, hasMerged, mergeError, yMax, zoom]);

  const mergedPoints = useMemo(() => {
    if (mergeError || !hasMerged) {
      return undefined;
    }
    return builtBack.map((featureCollection) =>
      featureCollection.features.map((feature) =>
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
    );
  }, [builtBack, hasMerged, mergeError, yMax, zoom]);

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
