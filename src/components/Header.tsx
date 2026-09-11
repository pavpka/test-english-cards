import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import { logout } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";

type HeaderProps = {
    isAuthenticated: boolean,
    username: string | null
}

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `header__link${isActive ? " header__link--active" : ""}`;

export default function Header({isAuthenticated, username} : HeaderProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="header">
            <NavLink className={getLinkClassName} to="/" end>Home</NavLink>
            <NavLink className={getLinkClassName} to="/cards">Cards</NavLink>
            {(isAuthenticated)
                ? (<><NavLink className={getLinkClassName} to="/profile">{username}</NavLink>
                 <button type="button" className="header__logout" onClick={handleLogout}>Logout</button></>)
                :<NavLink className={getLinkClassName} to="/login">Login</NavLink>
            }
        </nav>
    );
}
