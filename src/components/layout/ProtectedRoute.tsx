import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  TUser,
  logout,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  let user;
  if (token) {
    user = verifyToken(token);
  }

  if (!token || (role !== undefined && role !== (user as TUser)?.role)) {
    dispatch(logout());
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
