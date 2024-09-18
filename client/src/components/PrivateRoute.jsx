import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * PrivateRoute is a resuable component used to determine if a user is authorized to access a child route
 * @returns the requested route or navigates the user to the Sign in page
 */
const PrivateRoute = () => {
  const { authUser } = useContext(UserContext);
  const location = useLocation();

  return authUser ? <Outlet /> : <Navigate to='signin' state={{from: location.pathname}}/>
};


export default PrivateRoute;