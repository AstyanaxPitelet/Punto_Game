import { Route, Routes } from 'react-router-dom';
import './css/style.css';
import Home from './pages/Home';
import Punto from './pages/Punto';
import Login from './components/connexion/Login';
import Register from './components/connexion/SignUp';

function App() {

    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/punto" element={<Punto />} />
        </Routes>
      </>
    );
  
}

export default App;
