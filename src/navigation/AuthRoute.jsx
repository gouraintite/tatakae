import { Navigate } from "react-router-dom";

const AuthRoute = ({ redirectPath = "/back-office/report", children }) => {
  if (localStorage.getItem("uerToken")) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default AuthRoute;
