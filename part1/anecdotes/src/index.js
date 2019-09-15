import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button =({handleClick, text}) =>{
    return (
        <button onClick={handleClick}>{text}</button>
    )
}
const MostVotes =(props)=>{
   const maxVotes = Math.max(...props.points)
   const index = props.points.indexOf(maxVotes)

   return (
    <>
        <h1>Anecdote with most votes</h1>  
        <p>{props.anecdotes[index]}</p>
        <p>has {maxVotes} votes</p>
    </>
   )
} 

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(Array(6).fill(0))
    
    const handleClick  = () => {
        let number = Math.floor((Math.random() * 6))
        while (number===selected){
            number = Math.floor((Math.random() * 6))
        }
        console.log(number)
        setSelected(number)     
    } 
    const handleVote =() => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
        console.log(copy)
    }

  return (
    <div>
      <h1>Anecdote of the day</h1>  
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick ={handleVote} text='vote'/>
      <Button handleClick ={handleClick} text='next anecdote'/>
      <MostVotes points= {points} anecdotes={props.anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)