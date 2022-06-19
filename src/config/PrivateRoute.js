// @ts-nocheck
import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const PrivateRoute = () => {
  const user = localStorage.getItem("user");

  return user ? <Outlet /> : <Navigate replace to={"/login"} />;
};

export default PrivateRoute;
