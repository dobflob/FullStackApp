const Header = () => {
  return (
    <header>
      <div className='wrap header--flex'>
        <h1 className='header--logo'>
          <a href='index.html'>Courses</a>
        </h1>
        <nav>
          <ul className='header--signedout'>
            <li>
              <a href='#'>Sign Up</a>
            </li>
            <li>
              <a href='#'>Sign In</a>
            </li>
            <li>Welcome, Jessie Dobson!</li>
            <li>
              <a href='#'>Sign Out</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;