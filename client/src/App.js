import { Route, Routes } from 'react-router-dom';
import './sass/style.scss';
import Home from './pages/Home';
import Punto from './pages/Punto';
import Login from './components/connexion/Login';
import Register from './components/connexion/SignUp';
import Test from './pages/Test';

function App() {

    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/punto" element={<Punto />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </>
    );
  
}

export default App;
