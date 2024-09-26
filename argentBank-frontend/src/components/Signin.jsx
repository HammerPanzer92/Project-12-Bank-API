import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from "../redux/userReducer";
import { getProfile, login } from "../services/api";

export default function Signin() {
  //Stocke le username et mot de password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //Gére le formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email: username, password: password };
    try {
      const data = await login(userData);

      console.log("Login page :");
      console.log(data);

      if(data.body.token){
        const names = await getProfile(data.body.token);
        console.log("Names login :");
        console.log(names);
      }
    } catch (err) {
      console.error("Error during login : " + err);
    }
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
            <input type="checkbox" id="remember-me" />
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
