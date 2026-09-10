import { Link, Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import CardsPage from "../pages/CardsPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { useAppSelector } from "../store/hooks";
import { selectIsAuthenticated } from "../store/authSlice";

export default function Header() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    
    return (
        <>
        <nav>
            <Link to="/">Home</Link>
            {!isAuthenticated && <Link to="/login">Login</Link>}
            <Link to="/cards">Cards</Link>
            <Link to="/profile">Profile</Link>
        </nav>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cards" element={<CardsPage />} />

            <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            </Route>
        </Routes>
        </>
    );
}
