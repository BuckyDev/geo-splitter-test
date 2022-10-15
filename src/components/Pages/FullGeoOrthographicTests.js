import React from 'react';
import GeoOrthographicGrid from '../GeoOrthographicGrid';
import '../../App.css';
import fullSample from '../../fullSample';


function FullGeoOrthographicTests() {
  return (
    <>
      <div style={{marginBottom:'20px', fontSize: '36px'}}>Geo-orthographic grid</div>
      <div style={{ marginTop: '20px', marginBottom: '10px'}}>Original</div>
      <GeoOrthographicGrid
        type='original'
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
