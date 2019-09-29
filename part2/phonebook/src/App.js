import React, { useState, useEffect  } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/personsServices'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchValue, setSearchValue ] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [notifClassName, setClassName] = useState('')

// fetching initial data
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  // filters what to show all persons or those that match search query, case insensitive
  const personsToShow = showAll
  ? persons
  : persons.filter(person =>
    person.name
    .toLowerCase()
    .includes(searchValue.toLowerCase()))

  // finds person by name (does not matter of it starts from capital letter or not)
  const found = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())  

  // checks if peson already exists, if not- calls AddPerson() when submit button clicked, if yes- asks if user wants to update info
  const check=(e)=>{
  e.preventDefault()
  console.log(found)
    if (found === undefined){ 
      AddPerson(newName, newNumber)
    }
    else {
      const personToUpdate = {
        name: found.name,
        number: newNumber,
      }
      if (window.confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`)) { 
        personsService
        .update(found.id, personToUpdate)
        .then( updatedPersonData => {
          setPersons(persons.map(person => person.id!==found.id ? person :updatedPersonData ))
          setNewName('')
          setNewNumber('') 
          setClassName('success')
          setMessage(`number of ${personToUpdate.name} has been changed to ${personToUpdate.number}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(
            `Note '${personToUpdate.name}' has already been removed from server`
          )
          setClassName('error')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== found.id))
        })
      }
    }
  }

  // adds new persons to state 
  const AddPerson=(newName, newNumber)=>{
    const newPerson = {
        name: newName,
        number:newNumber,
      }
      personsService
      .create(newPerson)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('') 
        setClassName('success')
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })      
  }  

  // sets Newname to state when value changes in the form input according to that value. then it displayed in the input field
  const handleNameChange =(e)=>{
  console.log(e.target.value)
    setNewName(e.target.value)
  }

  //sets new number to state
  const handleNumberChange =(e)=>{
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  //sets search value to state and state of Showall dependidng on if there is value in the field 
  const handleSearchChange =(e)=>{
    console.log(e.target.value)
    setSearchValue(e.target.value)
  // if there is a value in the search field
    if (e.target.value){
      setShowAll(false)}
    else{
      setShowAll(true)}
  }

  // deleting entries from the phonebook
  const handleDelete =id => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) { 
      personsService
      .deleteNumber(id)
      .then( response =>{
        console.log(response)
        setPersons(persons.filter(person => person.id!==id))
        setClassName('success')
        setMessage(`Deleted ${personToDelete.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })   
    }
  }

  return (
    <div> 
      <h2>Phonebook</h2>
      <Notification message={message} className={notifClassName}/>
      <Filter searchValue ={searchValue} handleSearchChange={handleSearchChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} check={check} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>  
    </div>
  )
}

export default App