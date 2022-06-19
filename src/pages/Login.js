import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";
import { auth } from "../firebase/firebase";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        const user = result.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLoginByGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <main>
      <div className="row">
        <div className="colm-form">
          <h1 style={{ marginBottom: "20px" }}>LOGIN</h1>
          <div className="form-container">
            <small style={{ color: "red" }}>{error}</small>
            <input
              type="email"
              placeholder="Email address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn-login"
              style={{ cursor: "pointer" }}
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="btn-new"
              style={{ marginBottom: "20px", cursor: "pointer" }}
              onClick={handleLoginByGoogle}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt=""
                style={{ marginRight: "10px" }}
              />
              Login By Google
            </button>
            <small>
              Don't have already an account?
              <Link to="/register" style={{ display: "inline" }}>
                {" "}
                Register
              </Link>
            </small>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
