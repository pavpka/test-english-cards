import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authUser } from "../api/authApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = !username.trim() || !password.trim();

//   const state = useAppSelector((state) => state.auth);
//   console.log('token: ', state.token);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    authUser({ username, password })
      .then((resp) => {
        if (resp.isAllowed) {
          dispatch(login({token: resp.token}));
          navigate("/");
        } else {
			console.log('неверный логин/пароль')
		}	
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));


	  setUserName("");
	  setPassword("");
  };

  return (
    <div>
		{(isLoading) 
			? <div>loading...</div>
			: <form onSubmit={handleSubmit}>
				username:
				<input
				name="username"
				value={username}
				onChange={(e) => setUserName(e.target.value)}
				type="text"
				placeholder="username"
				/>
				<br />
				password:
				<input
				name="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				type="password"
				placeholder="password"
				/>
				<br />
				<button type="submit" disabled={isDisabled}>
				Submit
				</button>
			</form>
		}
    </div>
  );
}
