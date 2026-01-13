import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../state/auth";

/**
 * PUBLIC_INTERFACE
 * RequireAuth ensures the user is signed in. Redirects to /login otherwise.
 */
export function RequireAuth() {
  const { state } = useAuth();
  if (!state.isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

/**
 * PUBLIC_INTERFACE
 * RequireRole ensures the user has selected a role. Redirects to /roles otherwise.
 */
export function RequireRole() {
  const { state } = useAuth();
  if (!state.isAuthenticated) return <Navigate to="/login" replace />;
  if (!state.role) return <Navigate to="/roles" replace />;
  return <Outlet />;
}
