import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";
import { useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Markdown from 'react-markdown'
import UserContext from "../contexts/UserContext";

/**
 * CourseDetails takes in the courses global state and setCourses as props
 * When the component loads, the useEffect hook uses the apiHelper to make a GET request for the specific course using the courseId as a param
 * If the request returns course data, it sets the course state to the returned data
 * If the request returns a message instead of course data, it navigates the user to the notfound route
 * If the server returns a 500 error, it navigates users to the error route
 * If the course belongs to the current user, the page displays an Update and Delete button in addition to the Return to List link
 * @param {*} props.courses
 * @param {*} props.setCourses
 * @returns html for the course details or 'loading' text if request data hasn't returned yet
 */
const CourseDetails = ({courses, setCourses}) => {
  const navigate = useNavigate();
  const {authUser} = useContext(UserContext);
  const courseId = parseInt(useParams().id);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    let activeFetch = true;
    api(`/courses/${courseId}`, 'GET', null, null)
        .then(res => res.json())
        .then(data => {
          if(activeFetch && data.id) {
            setCourse(data)
          } else if (data.message) {
            navigate('/notfound');
          }
        })
        .catch(err => {
          navigate('/error');
          throw new Error('Something went wrong', err);
        });
        return () => activeFetch = false;
  }, [courseId, navigate]);

  if (course) {
  /**
     * handleDelete() makes a DELETE request sending the courseId of the course to delete as well as the authUser information
     * Delete button only shows to the user who created the course; the Delete request will fail server side if the userId doesn't match the authUser.id
     * Removes the course from the database if the user is authorized to delete the course
     * Navigates user to forbidden if user is not authorized
     * Navigates user to global error route if 500 thrown
     * @param {*} event
  */
    const handleDelete = async (event) => {
      event.preventDefault();

      try {
        const response = await api(`/courses/${course.id}`, 'DELETE', null, authUser);

        if (response.status === 204) {
          const updatedCourses = courses.filter(course => course.id !== courseId);
          setCourses(updatedCourses);
          navigate('/');
        } else if (response.status === 403) {
            navigate('/forbidden');
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
          <div className='actions--bar'>
            <div className='wrap'>
              {
                authUser && authUser.id === course.User.id ?
                <>
                  <Link className='button' to={`/courses/${course.id}/update`}>Update Course</Link>
                  <Link className='button' to='/courses' onClick={handleDelete}>Delete Course</Link>
                </>
                : ''
              }
              <Link className='button button-secondary' to='/courses'>Return to List</Link>
            </div>
          </div>
          <div className='wrap'>
            <h2>Course Detail</h2>
            <form>
              <div className='main--flex'>
                <div>
                  <h3 className='course--detail--title'>Course</h3>
                  <h4 className='course--name'>{course.title}</h4>
                  <p>By {course.User.firstName} {course.User.lastName}</p>
                  <Markdown>{course.description}</Markdown>
                </div>
                <div>
                  <h3 className='course--detail--title'>Estimated Time</h3>
                  <p>{course.estimatedTime ? course.estimatedTime : 'N/A'}</p>

                  <h3 className='course--detail--title'>Materials Needed</h3>
                    <Markdown className='course--detail--list'>{course.materialsNeeded}</Markdown>
                </div>
              </div>
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

CourseDetails.propTypes = {
  courses: PropTypes.array,
  setCourses: PropTypes.func
};

export default CourseDetails;