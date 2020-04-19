import React from 'react';
import Grid from './Grid';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ marginTop: '20px', marginBottom: '10px'}}>Original</div>
        <Grid type='original' />
        <div style={{ marginTop: '20px', marginBottom: '10px'}}>Splitted</div>
        <Grid type='splitted' />
        <div style={{ height: '30px' }} />
      </header>
    </div>
  );
}

export default App;
