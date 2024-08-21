import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const UserSignOut = () => {
  const {actions} = useContext(UserContext);

  useEffect(() => actions.signOut());
  return (
    <Navigate to='/' />
  );
};

export default UserSignOut;