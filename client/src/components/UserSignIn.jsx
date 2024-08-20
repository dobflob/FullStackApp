import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";

import UserContext from "../contexts/UserContext";

const UserSignIn = () => {
  const {actions} = useContext(UserContext);
  const navigate = useNavigate();

  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value
    }

    try {
      const user = await actions.signIn(credentials);

      if (user) {
        navigate('/courses');
      } else {
        setErrors(['Sign-in was unsuccessful'])
      }
    } catch (error) {
      console.log(error);
      navigate('/');
    }
  }

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  }

  return (
    <main>
      <div className='form--centered'>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label for='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' value='' />

          <label for='password'>Password</label>
          <input id='password' name='password' type='password' value='' />

          <button className='button' type='submit'>Sign In</button>
          <button className='button button-secondary' onclick={handleCancel}>Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <Link to='/signup'>sign up</Link>.</p>
      </div>
    </main>
  );
};

export default UserSignIn;