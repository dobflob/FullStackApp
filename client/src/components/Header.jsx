import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className='wrap header--flex'>
        <h1 className='header--logo'>
          <Link to='/courses'>Courses</Link>
        </h1>
        <nav>
          <ul className='header--signedout'>
            <li>
            <Link to='/signup'>Sign Up</Link>
            </li>
            <li>
            <Link to='/signin'>Sign In</Link>
            </li>
            <li>Welcome, Jessie Dobson!</li>
            <li>
              <Link to='/signout'>Sign Out</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;