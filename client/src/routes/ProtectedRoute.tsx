import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../services/mystore";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!user?.isAuthenticated && !token) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [user?.isAuthenticated]);

  return <>{children}</>;
};

export default ProtectedRoute;
