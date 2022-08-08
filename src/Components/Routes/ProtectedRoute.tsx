import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import authStore from "../../Mobx/AuthStore";

interface Props extends RouteProps {
  children: any;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const Backwards: any = -1;
  return authStore.user ? children : <Navigate to={Backwards} replace />;
};

export default ProtectedRoute;
