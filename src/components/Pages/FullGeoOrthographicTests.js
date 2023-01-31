import React from "react";
import OriginalGeoOrthographicGrid from "../GeoOrthographic/OriginalGeoOrthographicGrid";
import "../../App.css";
import fullSample from "../../fullSample.json";
import worldMap from "../../data/GSHHS_c_L1.json";
import antartic from "../../data/GSHHS_c_L6.json";
import SplittedGeoOrthographicGrid from "../GeoOrthographic/SplittedGeoOrthographicGrid";
import SphericPatternGrid from "../GeoOrthographic/SphericPatternGrid";
import { mapSphericGrid } from "../../constants/mapSphericGrids";
import CrudeMapSphericSplit from "../GeoOrthographic/CrudeMapSphericSplit";

function FullGeoOrthographicTests() {
  // TODO: Make that pass for the whole sample
  // There's a new edge case for polygon 11
  const workingSample = {
    ...fullSample,
    features: fullSample.features.filter(
      (feature) => feature.properties.id !== "11"
    ),
  };

  const wholeWorldMap = {
    ...worldMap,
    features: [...worldMap.features, ...antartic.features],
  };

  return (
    <>
      <div style={{ marginBottom: "20px", fontSize: "36px" }}>Spheric grid</div>
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>Pattern</div>
      <SphericPatternGrid zoom={0.3} {...mapSphericGrid.c} />
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>Crude split</div>
      <CrudeMapSphericSplit
        zoom={0.3}
        {...mapSphericGrid.c}
        data={wholeWorldMap}
      />
      {/* <div style={{ marginTop: "20px", marginBottom: "10px" }}>Original</div>
      <OriginalGeoOrthographicGrid
        data={fullSample}
        xMin={0}
        xMax={160}
        yMin={0}
        yMax={80}
        zoom={0.5}
        gridSize={10}
      />
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>Splitted</div>
      <SplittedGeoOrthographicGrid
        data={fullSample}
        xMin={0}
        xMax={160}
        yMin={0}
        yMax={80}
        zoom={0.5}
        gridSize={10}
      /> */}
      <div style={{ marginTop: "100px" }} />
    </>
  );
}

export default FullGeoOrthographicTests;
