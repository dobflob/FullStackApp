import { Link, useParams } from "react-router-dom";

const CourseDetails = ({courses}) => {
const idString = useParams().id;
const courseId = parseInt(idString);
let descriptionKey = 0;
let materialKey = 0;
let materialList = [];
const course = courses.find(course => course.id === courseId);

// TODO: add a helper function that takes a string and creates and array. if the last item in the array is blank, pop it off. if materials, replace '* ' with ''  -- also may need to look up closure when assigning keys so I don't have to use global variables

// TODO: after the above to do, go back and refactor to user react-markdown which is likely overkill for this project but teaches us more about using libraries and reading documentation.

let sentences = course.description.split('\n\n');
const sentenceList = sentences.map(sent => {
  descriptionKey++;
  return <p key={descriptionKey}>{sent}</p>
});

if (course.materialsNeeded) {
  let materials = course.materialsNeeded.split('\n');
  materials.pop();

  materialList = materials.map(material => {
  materialKey++;
  material = material.replace('* ', '');
  return <li key={materialKey}>{material}</li>
  });
}

  return (
    <main>
      <div className='actions--bar'>
        <div className='wrap'>
          <Link className='button' to={`/courses/${course.id}/update`}>Update Course</Link>
          <a className='button' href='#'>Delete Course</a>
          <a className='button button-secondary' href='#'>Return to List</a>
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
              {sentenceList}
            </div>
            <div>
              <h3 className='course--detail--title'>Estimated Time</h3>
              <p>{course.estimatedTime ? course.estimatedTime : 'N/A'}</p>

              <h3 className='course--detail--title'>Materials Needed</h3>
                {materialList.length ?
                  <ul className='course--detail--list'>
                    {materialList}
                  </ul>
                  : <p>N/A</p>}
            </div>
          </div>
        </form>
      </div>
    </main>

  );
};

export default CourseDetails;