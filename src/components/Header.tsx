import { Link, Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import CardsPage from "../pages/CardsPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PublicRoute from "./PublicRoute";

export default function Header({isAuthenticated, username} : any) {

    console.log('name: ', username);

    
    return (
        <>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/cards">Cards</Link>
            {(isAuthenticated)
                ? <Link to="/profile">{username}</Link>
                :<Link to="/login">Login</Link>
            }
        </nav>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cards" element={<CardsPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<div>Not found</div>} />
        </Routes>
        </>
    );
}
