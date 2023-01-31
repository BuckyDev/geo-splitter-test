import React, { useState } from "react";
import ConversionError from "./components/ConversionError";
import "./App.css";
import FullOrthonormalTests from "./components/Pages/FullOrthonormalTests";
import FullGeoOrthographicTests from "./components/Pages/FullGeoOrthographicTests";

const GRID_TYPES = {
  ORTHONORMAL: "ORTHONORMAL",
  GEO_ORTHOGRAPHIC: "GEO_ORTHOGRAPHIC",
};

function App() {
  const [gridType, setGridType] = useState(GRID_TYPES.ORTHONORMAL);
  return (
    <div className="App">
      <header className="App-header">
        <button
          type="submit"
          onClick={() =>
            setGridType(
              Object.keys(GRID_TYPES).filter((type) => type !== gridType)[0]
            )
          }
        >
          Swap
        </button>
        {gridType === GRID_TYPES.ORTHONORMAL && (
          <>
            <FullOrthonormalTests />
            <div style={{ height: "60px" }} />
            <ConversionError />
            <div style={{ height: "150px" }} />
          </>
        )}
        {gridType === GRID_TYPES.GEO_ORTHOGRAPHIC && (
          <FullGeoOrthographicTests />
        )}
      </header>
    </div>
  );
}

export default App;
