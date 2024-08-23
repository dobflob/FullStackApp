import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useContext } from "react";

import UserContext from "../contexts/UserContext";

const UserSignIn = () => {
  const {actions} = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let from = location.state? location.state.from : '/courses';

    const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value
    }

    try {
      const user = await actions.signIn(credentials);
      if (user) {
        navigate(from);
      } else {
        setErrors(['Sign-in was unsuccessful'])
      }
    } catch (error) {
      console.log(error);
      navigate('/'); // TODO: nav to error once error created
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
          <label htmlFor='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' ref={emailAddress}/>

          <label htmlFor='password'>Password</label>
          <input id='password' name='password' type='password' ref={password}/>

          <button className='button' type='submit'>Sign In</button>
          <button className='button button-secondary' type='button' onClick={handleCancel}>Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <Link to='/signup'>sign up</Link>.</p>
      </div>
    </main>
  );
};

export default UserSignIn;