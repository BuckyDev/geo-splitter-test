import React from "react";
import OriginalGeoOrthographicGrid from "../GeoOrthographic/OriginalGeoOrthographicGrid";
import "../../App.css";
import fullSample from "../../fullSample.json";
import SplittedGeoOrthographicGrid from "../GeoOrthographic/SplittedGeoOrthographicGrid";

function FullGeoOrthographicTests() {
  return (
    <>
      <div style={{ marginBottom: "20px", fontSize: "36px" }}>
        Geo-orthographic grid
      </div>
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>Original</div>
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
      />
    </>
  );
}

export default FullGeoOrthographicTests;
