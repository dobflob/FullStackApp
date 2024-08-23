import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext, useRef } from "react";
import { api } from "../utils/apiHelper";

const UpdateCourse = ({courses, setCourses}) => {
//TODO: update this component to follow course details -- -only do all the things if course !== null/undefined
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const courseId = parseInt(useParams().id);
  const course = courses.find(course => course.id === courseId);

  const courseTitle = useRef();
  const courseDescription = useRef();
  const estimatedTime = useRef();
  const materialsNeeded = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

  const updatedCourse = {
    id: course.id,
    userId: authUser.id,
    title: courseTitle.current.value,
    description: courseDescription.current.value,
    estimatedTime: estimatedTime.current.value,
    materialsNeeded: materialsNeeded.current.value
  };

    // TODO: figure out how to make manually typing the url work
    try {
      const response = await api(`/courses/${course.id}`, 'PUT', updatedCourse, authUser);

      if (response.status === 204) {
        console.log(`${course.title} has been updated`);
        const response = await api('/courses', 'GET', null, null);
        const data = await response.json();
        setCourses(data);
        navigate(`/courses/${course.id}`)
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
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div className='main--flex'>

            <div>
              <label htmlFor='courseTitle'>Course Title</label>
              <input id='courseTitle' name='courseTitle' type='text' ref={courseTitle} defaultValue={course.title}/>

              <p>By {authUser.firstName} {authUser.lastName}</p>

              <label htmlFor='courseDescription'>Course Description</label>
              <textarea id='courseDescription' name='courseDescription' ref={courseDescription} defaultValue={course.description}></textarea>
            </div>

            <div>
              <label htmlFor='estimatedTime'>Estimated Time</label>
              <input id='estimatedTime' name='estimatedTime' type='text' ref={estimatedTime} defaultValue={course.estimatedTime}/>

              <p>By {authUser.firstName} {authUser.lastName}</p>

              <label htmlFor='materialsNeeded'>MaterialsNeeded</label>
              <textarea id='materialsNeeded' name='materialsNeeded' ref={materialsNeeded} defaultValue={course.materialsNeeded}></textarea>
            </div>

          </div>

          <button className='button' type='submit'>Update Course</button>
          <button className='button button-secondary' onClick={handleCancel}>Cancel</button>

        </form>
      </div>
    </main>
  );
};

export default UpdateCourse;