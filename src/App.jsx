// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';

function App() {
  const loggedIn = localStorage.getItem('loggedIn');
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {loggedIn ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
      <Route path="*" element={<Navigate to={loggedIn ? '/' : '/login'} />} />
    </Routes>
  );
}

export default App;