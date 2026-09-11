import { NavLink, Route, Routes } from "react-router-dom";
import "./Header.scss";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import CardsPage from "../pages/CardsPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PublicRoute from "./PublicRoute";

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `header__link${isActive ? " header__link--active" : ""}`;

export default function Header({isAuthenticated, username} : any) {    
    return (
        <>
        <nav className="header">
            <NavLink className={getLinkClassName} to="/" end>Home</NavLink>
            <NavLink className={getLinkClassName} to="/cards">Cards</NavLink>
            {(isAuthenticated)
                ? <NavLink className={getLinkClassName} to="/profile">{username}</NavLink>
                :<NavLink className={getLinkClassName} to="/login">Login</NavLink>
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
            <Route path="*" element={<div className="header__not-found">Not found</div>} />
        </Routes>
        </>
    );
}
