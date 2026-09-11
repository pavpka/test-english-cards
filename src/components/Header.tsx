import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import "./Header.scss";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import CardsPage from "../pages/CardsPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PublicRoute from "./PublicRoute";
import { logout } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `header__link${isActive ? " header__link--active" : ""}`;

export default function Header({isAuthenticated, username} : any) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <>
        <nav className="header">
            <NavLink className={getLinkClassName} to="/" end>Home</NavLink>
            <NavLink className={getLinkClassName} to="/cards">Cards</NavLink>
            {(isAuthenticated)
                ? (<><NavLink className={getLinkClassName} to="/profile">{username}</NavLink>
                 <button type="button" className="header__logout" onClick={handleLogout}>Logout</button></>)
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

