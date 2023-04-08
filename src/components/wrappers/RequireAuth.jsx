import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ redirectLoggedIn, render }) {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  console.log(user.isAuth);

  if (user.isAuth && typeof redirectLoggedIn === "string")
    return (
      <Navigate to={redirectLoggedIn} state={{ from: location }} replace />
    );

  if (!user.isAuth && !redirectLoggedIn)
    return <Navigate to="/login-register" state={{ from: location }} replace />;
  if (user.isAuth) return render;

  // unauthorized
  return <Navigate to="/" state={{ from: location }} replace />;
}
