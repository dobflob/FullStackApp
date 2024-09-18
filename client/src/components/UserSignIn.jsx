import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRef, useContext, useState } from "react";

import UserContext from "../contexts/UserContext";

const UserSignIn = () => {
  const {actions} = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState([]);
  const emailAddress = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let from = location.state? location.state.from : '/courses';

    if (emailAddress.current.value && password.current.value) {
      const credentials = {
        emailAddress: emailAddress.current.value,
        password: password.current.value
      }

      try {
        const user = await actions.signIn(credentials);
        if (user) {
          navigate(from);
        } else {
          throw new Error('Sign-in was unsuccessful');
        }
      } catch (error) {
        console.log(error);
        navigate('/error');
      }
    } else {
      const valErrors = [];

      if (!emailAddress.current.value) {
        valErrors.push('Email is required');
      }

      if (!password.current.value) {
        valErrors.push('Password is required')
      }

      setErrors(valErrors.map(err => <li key={err}>{err}</li>));
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
        { errors.length ?
            <div className='validation--errors'>
              <h3>Validation Errors</h3>
              <ul>
                {errors}
              </ul>
            </div>
          : <div></div>
        }
        <form onSubmit={handleSubmit}>
          <label htmlFor='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' ref={emailAddress}/>

          <label htmlFor='password'>Password</label>
          <input id='password' name='password' type='password' ref={password}/>

          <button className='button' type='submit'>Sign In</button>
          <button className='button button-secondary' type='button' onClick={handleCancel}>Cancel</button>
        </form>
        <p>Don&apos;t have a user account? Click here to <Link to='/signup'>sign up</Link>.</p>
      </div>
    </main>
  );
};

export default UserSignIn;