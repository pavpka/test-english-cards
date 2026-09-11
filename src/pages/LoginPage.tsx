import { useState } from "react";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { authUser } from "../api/authApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/authSlice";
import { setName } from "../store/userSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCorret, setCorrect] = useState(true);
  const isDisabled = !username.trim() || !password.trim();

//   const state = useAppSelector((state) => state.auth);
//   console.log('token: ', state.token);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    authUser({ username, password })
      .then((resp) => {
        if (resp.isAllowed) {
          dispatch(login({token: resp.token, username: resp.user}));
		  dispatch(setName({name: resp.user}))
          navigate("/", { replace: true });
        } else {
			setCorrect(false);
			console.log('неверный логин/пароль')
		}	
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));


	  setUserName("");
	  setPassword("");
  };

  return (
    <div className="login-page">
		{(isLoading) 
			? <div className="login-page__status">авторизация...</div>
			: <div className="login-page__content"> {!isCorret && <div className="login-page__error">неверно</div>}
				<form className="login-page__form" onSubmit={handleSubmit}>
					<label className="login-page__field">
					username:
					<input
					className="login-page__input"
					name="username"
					value={username}
					onChange={(e) => setUserName(e.target.value)}
					type="text"
					placeholder="username"
					/>
					</label>
					<label className="login-page__field">
					password:
					<input
					className="login-page__input"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="password"
					/>
					</label>
					<button className="login-page__submit" type="submit" disabled={isDisabled}>
					Submit
					</button>
				</form>
			</div>
		}
    </div>
  );
}
