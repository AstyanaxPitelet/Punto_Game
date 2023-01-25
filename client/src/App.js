import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './css/style.css';
import Home from './pages/Home';
import Punto from './pages/Punto';
import Login from './components/connexion/Login';


function App() {

    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    );
  
}

export default App;
