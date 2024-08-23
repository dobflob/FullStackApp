import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { authUser } = useContext(UserContext);
  const location = useLocation();

  return authUser ? <Outlet /> : <Navigate to='signin' state={{from: location.pathname}}/>
};


export default PrivateRoute;