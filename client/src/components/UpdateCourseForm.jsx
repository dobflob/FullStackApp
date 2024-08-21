import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext, useRef } from "react";

const UpdateCourse = ({courses, updateCourse}) => {
  const idString = useParams().id;
  const courseId = parseInt(idString);
  const {authUser} = useContext(UserContext);
  const navigate = useNavigate();

  const course = courses.find(course => course.id === courseId);

  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

  console.log(course);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedCourse = {
      userId: authUser.id,
      title: courseTitle.current.value,
      description: courseDescription.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value
    };

    // TODO: figure out how to route to the details page -- and how to make manually typing the url work
    try {
      const response = await api('/courses', 'PUT', updatedCourse);
      console.log(response)

      if (response.status === 204) {
        console.log(`${course.title} has been updated`);
        updateCourse(courses.map((course, index) => {
          if (index === courses.indexOf(course)) {
            return updatedCourse;
          } ///THIS PROBABLY DOENS'T WORK - FIGURE OUT REPLACING ITEMS IN AN ARRAY
        }));
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
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div className='main--flex'>

            <div>
              <label htmlFor='courseTitle'>Course Title</label>
              <input id='courseTitle' name='courseTitle' type='text' defaultValue={course.title} rev={courseTitle} />

              <p>By {authUser.firstName} {authUser.lastName}</p>

              <label htmlFor='courseDescription'>Course Description</label>
              <textarea id='courseDescription' name='courseDescription' defaultValue={course.description} rev={courseDescription}></textarea>
            </div>

            <div>
              <label htmlFor='estimatedTime'>Estimated Time</label>
              <input id='estimatedTime' name='estimatedTime' type='text' defaultValue={course.estimatedTime} rev={estimatedTime} />

              <p>By {authUser.firstName} {authUser.lastName}</p>

              <label htmlFor='materialsNeeded'>MaterialsNeeded</label>
              <textarea id='materialsNeeded' name='materialsNeeded' defaultValue={course.materialsNeeded} rev={materialsNeeded}></textarea>
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