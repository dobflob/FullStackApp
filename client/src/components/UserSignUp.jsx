import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import { api } from "../utils/apiHelper";

/**
 * UserSignUp allows the user to enter their information to create and account and then sign in to the app
 * When a user submits the form, the handleSubmit function is called
 * When a user clicks cancel, the handleCancel function is called and the user is returned to the courses page
 * @returns html for the sign up form
 */
const UserSignUp = () => {
  const {actions} = useContext(UserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  /**
   * handleSubmit() sets the local variable 'user' to the values currently in the form elements
   * uses the apiHelper to make a POST request to create a new user
   * If a user is successfully created, the signIn function from the UserContext is called and if signin is successful, they're routed to the courses page
   * If the POST request returns a 400, the user will see a list of validation errors to correct before re-submitting the form
   * If the server throws a 500, the user will be routed to the global error page
   * @param {*} event
  */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value
    }

    try {
      const response = await api('/users', 'POST', user);

      if (response.status === 201) {
        await actions.signIn(user);
        navigate('/courses');
      } else if (response.status === 400) {
          const data = await response.json();
          setErrors(data.errors.map(err => <li key={err}>{err}</li>));
      } else {
          throw new Error('Sign-up was unsuccessful');
      }
    } catch (error) {
        console.log(error);
        navigate('/error');
    }
  }

  /**
   * handleCancel() navigates user back to the course list
   * @param {*} event
  */
  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/courses');
  };

  return (
    <main>
      <div className='form--centered'>
        <h2>Sign Up</h2>
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
          <label htmlFor='firstName'>First Name</label>
          <input id='firstName' name='firstName' type='text' ref={firstName} />

          <label htmlFor='lastName'>Last Name</label>
          <input id='lastName' name='lastName' type='text' ref={lastName} />

          <label htmlFor='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' ref={emailAddress}/>

          <label htmlFor='password'>Password</label>
          <input id='password' name='password' type='password' ref={password}/>

          <button className='button' type='submit'>Sign Up</button>
          <button className='button button-secondary' type='button' onClick={handleCancel}>Cancel</button>
        </form>
        <p>Already have a user account? Click here to <Link to='/signin'>sign in</Link>.</p>
      </div>
    </main>
  );
}

export default UserSignUp;