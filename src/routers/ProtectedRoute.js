import React from "react";
import useAuth from "../custom-hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/e-market/login" />;
};

export default ProtectedRoute;