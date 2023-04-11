import { Route, Routes } from 'react-router-dom';
import './sass/style.scss';
import Home from './pages/Home';
import Punto from './pages/Punto';
import Login from './components/connexion/Login';
import Register from './components/connexion/SignUp';
import Test from './pages/Test';
import { RequireAuth } from 'react-auth-kit';
import Room from './pages/Room';
import Lobby from './pages/Lobby';
import NavBar from './components/navbar/NavBar';

function App() {

    return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/room" element={
            <RequireAuth loginPath='/login'>
              <Room />
            </RequireAuth>
          } />
          <Route path='/room/:idroom/:nbplayer' element={
            <RequireAuth loginPath='/login'>
              <Lobby />
            </RequireAuth>
          }/>
          <Route path="/punto/:idroom/:nbplayer" element={
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
