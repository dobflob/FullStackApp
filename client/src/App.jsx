import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';


import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import UpdateCourse from './components/UpdateCourseForm';
import CreateCourse from './components/CreateCourse';
import { api } from './utils/apiHelper';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';


function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let activeFetch = true;

    api('/courses', 'GET', null, null)
      .then(res => res.json())
      .then(data => {
        if(activeFetch) {
          setCourses(data)
        }
      })
      .catch(err => new Error('Something went wrong', err));

      return () => activeFetch = false;
  }, []);

  return  (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/courses'/>}/>
        <Route path='/courses' element={<Courses courses={courses}/>}/>
        <Route path='/courses/:id' element={<CourseDetails courses={courses} deleteCourse={setCourses}/>}/>
        <Route path='/courses/:id/update' element={<UpdateCourse />}/>
        <Route path='/createcourse' element={<CreateCourse courses={courses} addCourse={setCourses}/>} />
        <Route path='/signin' element={<UserSignIn />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/signout' element={<UserSignOut />} />
      </Routes>
    </>
  )

}

export default App;
