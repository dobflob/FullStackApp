import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

/**
 * Courses takes in the courses global state as a prop and maps the courses to the html for each course card
 * once each course is mapped to the html, renders the course list to the page and the new course button after the last course in the list
 * @param {*} props.courses
 * @returns html for the course list
 */
const Courses = ({courses}) => {

  const courseList = courses.map(course => {
    return (
    <Link className='course--module course--link' to={`/courses/${course.id}`} key={course.id}>
      <h2 className='course--label'>Course</h2>
      <h3 className='course--title'>{course.title}</h3>
    </Link>
    )
  });

  return (
    <main>
      <div className='wrap main--grid'>
        {courseList}
        <Link className='course--module course--add--module' to='/createcourse'>
          <span className='course--add--title'>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

Courses.propTypes = {
  courses: PropTypes.array
};

export default Courses;