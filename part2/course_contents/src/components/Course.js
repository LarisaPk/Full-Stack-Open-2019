import React from 'react';

const Course = ({course}) =>{
    return(
     <>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
     </>
    )
}
const Header = ({course}) =>  <h2>{course.name}</h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
    return(
       parts.map(part=>
            <Part part={part} key={part.id} />  
        )    
    ) 
}
// calculates sum of exercises 
const Total = ({parts}) => {
  const total = parts.reduce( (sum, part) => sum + part.exercises,0 )
  return <p style={{fontWeight: 'bold'}}>total of {total} exercises</p>
}

export default Course