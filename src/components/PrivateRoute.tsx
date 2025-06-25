import { Navigate } from "react-router-dom";
import React from "react";
import { useGetUserDetailsQuery } from "../redux/api/usersApiSlice";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { data, isLoading } = useGetUserDetailsQuery();
  return isLoading ? (
    <p>Loading....</p>
  ) : data ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
