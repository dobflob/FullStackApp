import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { api } from "../utils/apiHelper";

const CreateCourse = ({courses, addCourse}) => {
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

    // TODO: figure out how to route to the details page -- and how to make manually typing the url work
    try {
      const response = await api('/courses', 'POST', course, authUser);

      if (response.status === 201) {
        console.log(`${course.title} has been created`);
        addCourse([...courses, course]);
        navigate('/courses');
      } else if (response.status === 400) {
          const data = await response.json();
          setErrors(data.errors);
          const errorList = errors.map(err => <li>{err}</li>);
          return errorList;
      } else {
          throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/'); //want to change to use location so we can go back to where we came from
  }

  return (
    <main>
        <div className='wrap'>
          <h2>Create Course</h2>
          { errors.length ?
            <div className='validation--errors'>
              <h3>Validation Errors</h3>
              <ul>
                {errorList}
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

export default CreateCourse;