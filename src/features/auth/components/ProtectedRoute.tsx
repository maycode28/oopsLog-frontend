import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUserSession } from "../utils/session";

export function ProtectedRoute() {
  const location = useLocation();

  if (!getUserSession()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
