import { Navigate } from "react-router-dom";
import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import { getCurrentUser, isAuthenticated } from "../utils/auth";

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
  allowedRoles,
}) {
  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} />;
  }

  if (allowedRoles) {
    const user = getCurrentUser();

    if (!allowedRoles.includes(user.role)) {
      return <ErrorMessage>Acceso denegado</ErrorMessage>;
    }
  }
  return children;
}
