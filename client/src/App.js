import { useState } from 'react';
import './css/style.css';
import Square from './components/punto/Square';
import Card from './components/punto/Card';

function App() {

    return (
      <div className="game">
        <div className="grid">
          <Square />
        </div>
        <div className="cards-player">
          <Card />
        </div>
      </div>
    );
  
}

export default App;
