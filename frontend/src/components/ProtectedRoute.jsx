import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token");

  if (!isLoggedIn) {
    toast.error("Please login first to access this page!", {
      position: "top-right",
      autoClose: 2000,
      className: "bg-red-500 text-white font-semibold rounded-lg shadow-lg",
      bodyClassName: "text-white",
      progressClassName: "bg-white",
    });

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
