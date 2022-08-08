import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";
import authStore from "../../Mobx/AuthStore";

interface Props extends RouteProps {
  children: any;
}

const PrivateRouteLogin: React.FC<Props> = ({ children }) => {
  return authStore.user ? <Navigate to="/Dashboard`" replace /> : children;
};

export default PrivateRouteLogin;
