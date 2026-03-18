import { Outlet } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";

export const ProtectedRoute = () => (
  <AuthGuard>
    <Outlet />
  </AuthGuard>
);
