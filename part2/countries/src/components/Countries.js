import React from 'react'


const Countries =({countriesToShow, handleSearchChange}) =>{
    return (
        countriesToShow.map(country=>
            <div key ={country.numericCode}>{country.name} 
              <button onClick={handleSearchChange} value={country.name}>show</button>
            </div>
        )      
    )
}

export default Countries