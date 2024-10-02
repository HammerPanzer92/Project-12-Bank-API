import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeAuth,
  fetchUserLogin,
  fetchUserProfile,
} from "../redux/userReducer";
import { getTokenCookie, setTokenCookie } from "../services/token";

export default function Signin() {
  //Stocke le username et mot de password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Bool pour stockage du token dans un cookie
  const [remember, setRemember] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = getTokenCookie();
    if (user.auth) {
      if (remember) {
        setTokenCookie(user.auth);
      }
      navigate("/user");
    } else if (cookie) {
      dispatch(changeAuth(cookie));
      dispatch(fetchUserProfile(cookie));
    }
  }, [user, navigate]);

  //Gére le formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email: username, password: password };

    dispatch(fetchUserLogin(userData));
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={remember}
              onChange={(e) => {
                setRemember(e.target.checked);
              }}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
