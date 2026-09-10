import Home from '../pages/HomePage'
import { Link, Route, Routes } from 'react-router-dom'

import '../App.css'
import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import CardsPage from '../pages/CardsPage';
import ProfilePage from '../pages/ProfilePage';

function App() {
  const isAuthenticated = false; 
  return (
    <>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/cards">Cards</Link>
      <Link to="/profile">Profile</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/cards' element={<CardsPage />} />

      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path='/profile' element={<ProfilePage />} />
      </Route>

    </Routes>
    </>
  )
}

export default App
