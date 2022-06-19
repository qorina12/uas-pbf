import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import logo from "../images/logo.jpg";

function User() {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then((user) => {
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((error) => {});
  };

  return (
    <div className="User">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="info">
        <p>Shedule Anin</p>
        <a href="#" onClick={handleLogout}>
          Logout!
        </a>
      </div>
    </div>
  );
}

export default User;
