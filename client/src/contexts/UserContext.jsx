import { createContext, useState } from "react";
import Cookies from "js-cookie";
import PropTypes from 'prop-types';
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const cookie = Cookies.get('authenticatedUser');
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

  /**
   * signIn uses the apiHelper to make a GET request to the server, passing the user's email and password
   * If the call is successful, the user info is returned and the authUser state is set to that user and the authenticatedUser cookie is set to persist the logged in user
   * If the call returns a 401 Unauthorized error, 'null' is returned
   * If the server throws a 500 error, a new error is thrown
   * @param {*} credentials
   * @returns user or null
   */
  const signIn = async (credentials) => {
    const response = await api('/users', 'GET', null, credentials);

    if (response.status === 200) {
      const user = await response.json();
      user.password = credentials.password;
      setAuthUser(user);
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
      return user;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  /**
   * Sets the authUser state to null and removes the authenticatedUser cookie
   */
  const signOut = () => {
    setAuthUser(null);
    Cookies.remove('authenticatedUser');
  }

  return (
    <UserContext.Provider value={{
      authUser,
      actions: {
        signIn,
        signOut
      }
    }}>
      {props.children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node
};

export default UserContext;