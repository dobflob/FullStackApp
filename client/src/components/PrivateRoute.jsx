import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { authUser } = useContext(UserContext);

  return authUser ? <Outlet /> : <Navigate to='signin' />
};


export default PrivateRoute;