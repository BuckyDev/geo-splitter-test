import React from 'react';
import OrthonormalGrid from './components/OrthonormalGrid';
import ConversionError from './components/ConversionError';
import './App.css';
import fullSample from './fullSample';
import OrthonormalTests from './components/OrthonormalTests';
import GeoOrthographicTests from './components/GeoOrthographicTests';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{marginBottom:'20px', fontSize: '36px'}}>Orthonormal grid</div>
        <div style={{ marginTop: '20px', marginBottom: '10px'}}>Original</div>
        <OrthonormalGrid
          type='original'
          data={fullSample}
          xMin={0}
          xMax={100}
          yMin={0}
          yMax={50}
          gridSize={10}
        />
        <div style={{ marginTop: '20px', marginBottom: '10px'}}>Splitted</div>
        <OrthonormalGrid
          type='splitted'
          data={fullSample}
          xMin={0}
          xMax={100}
          yMin={0}
          yMax={50}
          gridSize={10}
        />
        <div style={{ height: '60px' }} />
        <div>
          <div style={{marginBottom:'20px'}}>Main functions</div>
          <OrthonormalTests/>
        </div>

        <div style={{marginBottom:'20px', marginTop:'40px', fontSize: '36px'}}>Geo-orthographic grid</div>
        <GeoOrthographicTests/>
        <div style={{ height: '60px' }} />
        <ConversionError/>
        <div style={{ height: '150px' }} />
      </header>
    </div>
  );
}

export default App;
