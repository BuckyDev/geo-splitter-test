import React from "react";
import "../../App.css";
import fullSample from "../../fullSample";
import OrthonormalTests from "../OrthonormalTests";
import OriginalOrthonormalGrid from "../Orthonormal/OriginalOrthonormalGrid";
import SplittedOrthonormalGrid from "../Orthonormal/SplittedOrthonormalGrid";
import BuiltBackOrthonormalGrid from "../Orthonormal/BuiltBackOrthonormalGrid";

function FullOrthonormalTests() {
  const actualSample = {
    ...fullSample,
    features: fullSample.features.slice(-1),
  };
  return (
    <>
      <div style={{ marginBottom: "20px", fontSize: "36px" }}>
        Orthonormal grid
      </div>
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>Original</div>
      <OriginalOrthonormalGrid
        data={actualSample}
        xMin={0}
        xMax={100}
        yMin={0}
        yMax={50}
        gridSize={10}
      />
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>Splitted</div>
      <SplittedOrthonormalGrid
        data={actualSample}
        xMin={0}
        xMax={100}
        yMin={0}
        yMax={50}
        gridSize={10}
      />
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>Built back</div>
      <BuiltBackOrthonormalGrid
        data={actualSample}
        xMin={0}
        xMax={100}
        yMin={0}
        yMax={50}
        gridSize={10}
      />
      <div style={{ height: "60px" }} />
      <div>
        <div style={{ marginBottom: "20px" }}>Main functions</div>
        {/* <OrthonormalTests /> */}
      </div>
    </>
  );
}

export default FullOrthonormalTests;
