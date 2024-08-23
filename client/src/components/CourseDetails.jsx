import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { api } from "../utils/apiHelper";
import { useContext, useState, useEffect } from "react";
import Markdown from 'react-markdown'
import UserContext from "../contexts/UserContext";

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
          if(activeFetch)
            setCourse(data)
        })
        .catch(err => new Error('Something went wrong', err));
        return () => activeFetch = false;

  }, []);

  if (course) {
    const handleDelete = async (event) => {
      event.preventDefault();

      try {
        const response = await api(`/courses/${course.id}`, 'DELETE', null, authUser);

        if (response.status === 204) {
          console.log(`${course.title} has been deleted`);
          const updatedCourses = courses.filter(course => course.id !== courseId);
          setCourses(updatedCourses);
          navigate('/');
        } else if (response.status === 403) {
            console.log('403');
        } else {
            throw new Error();
        }
      } catch (error) {
        console.log(error);
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

      )
  } else {
    //currently will get stuck on loading if you ask for an id that doesn't exist... need to set up not found route
    return (
      <main>
        <div className='wrap'>
          <p>Loading...</p>
        </div>
      </main>
    )
  }



/* useEffect(() => {
  let activeFetch = true;

    api(`/courses/${courseId}`, 'GET', null, null)
      .then(res => res.json())
      .then(data => {

        if(activeFetch) {
          setCourse(data)
        }
      })
      .catch(err => new Error('Something went wrong', err));
      return () => activeFetch = false;
}, [courseId]); */

// TODO: add a helper function that takes a string and creates and array. if the last item in the array is blank, pop it off. if materials, replace '* ' with ''  -- also may need to look up closure when assigning keys so I don't have to use global variables

// TODO: after the above to do, go back and refactor to user react-markdown which is likely overkill for this project but teaches us more about using libraries and reading documentation. may try hand at creating your own little package that formats markdown???


};


export default CourseDetails;