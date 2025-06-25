import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
  children: React.ReactElement;
}
const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { userInfo, isLoading } = useSelector((state: RootState) => state.auth);

  return isLoading ? (
    <p>Loading....</p>
  ) : userInfo ? (
    <Navigate to="/" replace />
  ) : (
    children
  );
};

export default AuthRoute;
