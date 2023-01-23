import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './css/style.css';
import Home from './pages/Home';
import Punto from './pages/Punto';


function App() {

    return (
      <>
        <Routes>
          <Route path="/" element={<Punto />} />
        </Routes>
      </>
    );
  
}

export default App;
