import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

type RequireAuthPropsType = {
  children: React.ReactNode;
};

function RequiresAuth({ children }: RequireAuthPropsType) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <div>{children}</div>
  ) : (
    <Navigate state={{ path: location.pathname }} to="/login" replace />
  );
}

export default RequiresAuth;
