import ReactDOM from 'react-dom'
import React, {useState} from 'react'

const Statistic =(props)=>{
    return (
        <tr>
            <td>{props.text} </td>
            <td>{props.value}</td>
        </tr>
    )
}
// button component for submitting feedback
const Button =(props)=> {
    return ( 
        <button onClick={props.handleClick}>{props.text}</button>
    )
}
// component returns statistics only if feedback is given
const Statistics = (props) => {
    
    // if all feedback is 0, returnes <p> with No feedback given
  if (props.all===0) {
      return (
            <p>No feedback given</p> 
      )
  }
   // if all feedback !=0 returns statistics
   else {
      return (
        <table> 
            <tbody>
                 <Statistic text='good' value={props.good}/>
                 <Statistic text='neutral' value={props.neutral}/>
                 <Statistic text='bad' value={props.bad}/>
                 <Statistic text='all' value={props.all}/>
                 <Statistic text='average' value={(props.scores/props.all).toFixed(1)}/>
                 <Statistic text='positive' value={((props.good/props.all)*100).toFixed(1)+'%'}/>{/*.toFixed() - number of digits to appear after the decimal point*/}
            </tbody>  
        </table>
        )
   } 
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //saves all clicks to state
  const [all, setAll] = useState(0)
  // saves scores to state
  const [scores, setScores] = useState(0)

  const goodClicked = () => {
      setGood(good+1)
      setAll(all+1)
      setScores(scores+1)

    }
  const neutralClicked = () =>{
      setNeutral(neutral+1)
      setAll(all+1)
      
    } 
  const badClicked = () =>{
      setBad(bad+1)
      setAll(all+1)
      setScores(scores-1)
  } 
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={goodClicked} text= "good"/>
      <Button handleClick={neutralClicked} text= "neutral"/>
      <Button handleClick={badClicked} text= "bad"/>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} scores={scores} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
