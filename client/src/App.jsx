import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import UpdateCourse from './components/UpdateCourseForm';
import CreateCourse from './components/CreateCourse';
import { api } from './utils/apiHelper';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';


function App() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

/**
   * useEffect hook makes async GET request for all courses
   * then formats response as json
   * then if it's the active fetch, sets the courses state to the response data
   * If there's a server error with the request, navigates user to the error route
*/
  useEffect(() => {
    let activeFetch = true;
    api('/courses', 'GET', null, null)
      .then(res => res.json())
      .then(data => {
        if(activeFetch) {
          setCourses(data)
        }
      })
      .catch(err => {
        navigate('/error');
        throw new Error('Something went wrong', err);
      });
      return () => activeFetch = false;
  }, [navigate]);

  return  (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/courses'/>}/>
        <Route path='/courses' element={<Courses courses={courses}/>}/>
        <Route path='/courses/:id' element={<CourseDetails courses={courses} setCourses={setCourses} />}/>
        <Route element={<PrivateRoute />}>
          <Route path='/courses/:id/update' element={<UpdateCourse courses={courses} setCourses={setCourses}/>}/>
          <Route path='/createcourse' element={<CreateCourse courses={courses} setCourses={setCourses}/>} />
        </Route>
        <Route path='/signin' element={<UserSignIn />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/signout' element={<UserSignOut />} />
        <Route path='/notfound' element={<NotFound />} />
        <Route path='/forbidden' element={<Forbidden />} />
        <Route path='/error' element={<UnhandledError />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;
