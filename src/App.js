import React from 'react';
import Grid from './components/Grid';
import UnitTests from './components/UnitTests';
import './App.css';
import fullSample from './fullSample';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ marginTop: '20px', marginBottom: '10px'}}>Original</div>
        <Grid 
          type='original'
          data={fullSample}
          xMin={0}
          xMax={100}
          yMin={0}
          yMax={50}
          gridSize={10}
        />
        <div style={{ marginTop: '20px', marginBottom: '10px'}}>Splitted</div>
        <Grid 
          type='splitted'
          data={fullSample}
          xMin={0}
          xMax={100}
          yMin={0}
          yMax={50}
          gridSize={10}
        />
        <div style={{ height: '60px' }} />
        <UnitTests/>
        <div style={{ height: '150px' }} />
      </header>
    </div>
  );
}

export default App;
