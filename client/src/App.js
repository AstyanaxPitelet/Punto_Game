import { Route, Routes } from 'react-router-dom';
import './sass/style.scss';
import Home from './pages/Home';
import Punto from './pages/Punto';
import Login from './components/connexion/Login';
import Register from './components/connexion/SignUp';
import Test from './pages/Test';
import { RequireAuth } from 'react-auth-kit';

function App() {

    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/punto" element={
            <RequireAuth loginPath='/login'>
              <Punto />
            </RequireAuth>
          }/>
          <Route path="/test" element={<Test />} />
        </Routes>
      </>
    );
  
}

export default App;
