import React from 'react';
import ReactDOM from 'react-dom';

//takes care of rendering the name of the course
const Header = (props) => {
    console.log(props)
    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }

//renders the parts
const Content = (props) => {
    console.log(props)
    return (
        <>
          <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
          <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
          <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
        </>
      )
  }

// renders the name and number of exercises of one part
const Part  = (props) => {
    console.log(props)
    return (
      <>
        <p>
        {props.part} {props.exercises}
        </p>
      </>
    )
  }

//renders the total amount of exercises  
const Total = (props) => {
    console.log(props)
    let sum=0;
    
    props.parts.forEach(element => {
      sum=sum+element.exercises;
    });


    return (
      <>
        <p>Number of exercises {sum}</p>
      </>
    )
  }  

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
    return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    )
  }
  

ReactDOM.render(<App />, document.getElementById('root'));

