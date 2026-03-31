import React from "react";
import { Navigate } from "react-router-dom";
import notify from "../utils/notify";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token");

  if (!isLoggedIn) {
    notify("Please login to continue");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
