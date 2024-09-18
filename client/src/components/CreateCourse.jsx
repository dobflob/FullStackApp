import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import UserContext from "../contexts/UserContext";
import { api } from "../utils/apiHelper";

const CreateCourse = ({courses, setCourses}) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const {authUser} = useContext(UserContext);

  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

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