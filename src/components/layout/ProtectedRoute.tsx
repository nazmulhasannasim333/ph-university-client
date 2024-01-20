import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const token = useAppSelector(useCurrentToken);
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
