import { use } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { userInfo, loading } = use(AuthContext);

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-48">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  if (userInfo && userInfo?.email) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
