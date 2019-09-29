import React from 'react'

const DisplayPerson =({name, number, handleDelete}) =>{
    return (
        <div>
            <div>{name} {number}  <button onClick={handleDelete}>delete</button></div>
        </div>

    )
}

export default DisplayPerson