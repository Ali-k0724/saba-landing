import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthState } from "../contexts/AuthContext";

const PrivateRoute = ({ role }) => {
  const { auth } = AuthState();
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};


export default PrivateRoute;
