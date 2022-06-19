// @ts-nocheck
import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const PublicRoute = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // });
  const user = localStorage.getItem("user");

  return user ? <Navigate replace to={"/"} /> : <Outlet />;
};

export default PublicRoute;
