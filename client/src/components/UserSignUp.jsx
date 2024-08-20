import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import { api } from "../utils/apiHelper";

const UserSignUp = () => {
  const {actions} = useContext(UserContext);
  const navigate = useNavigate();

  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

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

      if (response.status === 200) {
        console.log(`${user.emailAddress} is successfully signed up`);
        await actions.signIn(user);
        navigate('/courses');
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate('/signup');
    }
  }

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/signin');
  };

  return (
    <main>
      <div className='form--centered'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label for='firstName'>First Name</label>
          <input id='firstName' name='firstName' type='text' value=''/>

          <label for='lastName'>Last Name</label>
          <input id='lastName' name='lastName' type='text' value=''/>

          <label for='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' value=''/>

          <label for='password'>Password</label>
          <input id='password' name='password' type='password' value=''/>

          <button className='button' type='submit'>Sign Up</button>
          <button className='button button-secondary' onclick={handleCancel}>Cancel</button>
        </form>
        <p>Already have a user account? Click here to <Link to='/signin'>sign in</Link>.</p>
      </div>
    </main>
  );
}

export default UserSignUp;