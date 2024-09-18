import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext, useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { api } from "../utils/apiHelper";

const UpdateCourse = ({setCourses}) => {

  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const courseId = parseInt(useParams().id);
  const [course, setCourse] = useState(null);
  const courseTitle = useRef();
  const courseDescription = useRef();
  const estimatedTime = useRef();
  const materialsNeeded = useRef();

  useEffect(() => {
    let activeFetch = true;

    api(`/courses/${courseId}`, 'GET', null, null)
        .then(res => res.json())
        .then(data => {
          if(activeFetch && data.id) {
            if(data.userId === authUser.id) {
              setCourse(data)
            } else {
              navigate('/forbidden');
            }
          } else if (data.message) {
            navigate('/notfound');
          }
        })
        .catch(err => {
          navigate('/error');
          throw new Error('Something went wrong', err);
        });
        return () => activeFetch = false;

  }, [authUser.id, courseId, navigate]);

  if (course) {

    const handleCancel = (event) => {
      event.preventDefault();
      navigate(`/courses/${course.id}`);
    }

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

      try {
        const response = await api(`/courses/${course.id}`, 'PUT', updatedCourse, authUser);

        if (response.status === 204) {
          const response = await api('/courses', 'GET', null, null);
          const data = await response.json();
          setCourses(data);
          navigate(`/courses/${course.id}`)
        } else if (response.status === 400) {
            const data = await response.json();
            const errors = data.errors;
            const errorList = errors.map(err => <li key={err}>{err}</li>);
            return errorList;
        } else {
            throw new Error();
        }
      } catch (error) {
        console.log(error);
        navigate('/error');
      }
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
  } else {

    return (
      <main>
        <div className='wrap'>
          <p>Loading...</p>
        </div>
      </main>
    )
  }
};

UpdateCourse.propTypes = {
  setCourses: PropTypes.func
};

export default UpdateCourse;