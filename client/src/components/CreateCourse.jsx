import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import UserContext from "../contexts/UserContext";
import { api } from "../utils/apiHelper";


/**
 * CreateCourse takes in the courses global state and setCourses as props
 * When a user submits the form, the handleSubmit function is called
 * When a user clicks cancel, the handleCancel function is called
 * The component uses the courses and setCourses props to update the courses state when a user successfully creates a course
 * @param {*} props.courses
 * @param {*} props.setCourses
 * @returns html for the create course form
 */
const CreateCourse = ({courses, setCourses}) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const {authUser} = useContext(UserContext);

  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

/**
   * handleSubmit() makes a POST request sending the courseId of the course to delete as well as the authUser information
   * The POST request will fail server side if the userId doesn't match the authUser.id
   * Creates the course in the database if the user is authorized to create a course
   * Navigates user to forbidden if user is not authorized
   * Navigates user to global error route if 500 thrown
   * @param {*} event
*/
  const handleSubmit = async (event) => {
    event.preventDefault();

    const course = {
      userId: authUser.id,
      title: courseTitle.current.value,
      description: courseDescription.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value
    };

    try {
      const response = await api('/courses', 'POST', course, authUser);

      if (response.status === 201) {
        const response = await api('/courses', 'GET', null, null ); // these 3 lines should probably be a re-usable function to get the latest course list
        const data = await response.json();
        const newCourse = data.pop();
        setCourses([...courses, newCourse]);
        navigate(`/courses/${newCourse.id}`);
      } else if (response.status === 400) {
          const data = await response.json();
          setErrors(data.errors.map(err => <li key={err}>{err}</li>));
      } else {
          throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  }

/**
   * handleCancel() navigates user back to the course details
   * @param {*} event
*/
  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  }

  return (
    <main>
        <div className='wrap'>
          <h2>Create Course</h2>
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
            <div className='main--flex'>

              <div>
                <label htmlFor='courseTitle'>Course Title</label>
                <input id='courseTitle' name='courseTitle' type='text' ref={courseTitle} />

                <p>By {authUser.firstName} {authUser.lastName}</p>

                <label htmlFor='courseDescription'>Course Description</label>
                <textarea id='courseDescription' name='courseDescription' ref={courseDescription}></textarea>
              </div>

              <div>
                <label htmlFor='estimatedTime'>Estimated Time</label>
                <input id='estimatedTime' name='estimatedTime' type='text' ref={estimatedTime} />

                <label htmlFor='materialsNeeded'>Materials Needed</label>
                <textarea id='materialsNeeded' name='materialsNeeded' ref={materialsNeeded}></textarea>
              </div>

            </div>

            <button className='button' type='submit'>Create Course</button>
            <button className='button button-secondary' type='button' onClick={handleCancel}>Cancel</button>
          </form>
        </div>
    </main>
  )
};

CreateCourse.propTypes = {
  courses: PropTypes.array,
  setCourses: PropTypes.func
};

export default CreateCourse;