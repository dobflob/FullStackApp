import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

/**
 * Header is a top level component that is always present in the app
 * It uses the UserContext to get the authUser (currently signed in user)
 * If the a user is signed in, the header content shows the user's name and the option to 'sign out'
 * If no user is signed in, the header content shows the options 'sign up' and 'sign in'
 * @returns html for the header
 */
const Header = () => {
  const {authUser} = useContext(UserContext);

  return (
    <header>
      <div className='wrap header--flex'>
        <h1 className='header--logo'>
          <Link to='/courses'>Courses</Link>
        </h1>
        <nav>
          <ul className='header--signedout'>
            { authUser ?
            <>
              <li>Welcome, {authUser.firstName} {authUser.lastName}</li>
              <li>
                <Link to='/signout'>Sign Out</Link>
              </li>
            </>
            : <>
              <li>
                <Link to='/signup'>Sign Up</Link>
              </li>
              <li>
                <Link to='/signin'>Sign In</Link>
              </li>
            </> }
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;