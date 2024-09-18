import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

/**
 * UserSignOut signs the current user out of the app using the UserContext signOut function
 * and navigates the user to the course list view
 */
const UserSignOut = () => {
  const {actions} = useContext(UserContext);

  useEffect(() => actions.signOut());
  return (
    <Navigate to='/' />
  );
};

export default UserSignOut;