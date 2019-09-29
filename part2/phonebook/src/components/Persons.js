import React from 'react'
import DisplayPerson from './DisplayPerson'

const Persons =({personsToShow, handleDelete}) =>{
    return (
            personsToShow.map(person=>
            <DisplayPerson key ={person.name} name={person.name} number={person.number} handleDelete={()=>handleDelete(person.id)}/>
          )
    )
}

export default Persons