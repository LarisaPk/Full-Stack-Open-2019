import React from 'react'
import Course from './components/Course';

const Courses = ({courses}) =>{
    return(
        courses.map(course=>
            <Course course={course} key={course.id} /> 
        )      
    )
}
const AppName = ({text}) =>  <h1>{text}</h1>

const App = ({courses}) => {

  
    return (
      <div>
        <AppName text='Web development curriculum'/>
        <Courses courses={courses} />
      </div>
    )
}

export default App