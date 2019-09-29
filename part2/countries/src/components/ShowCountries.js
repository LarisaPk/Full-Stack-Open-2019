import React from 'react'
import Country from './Country'
import Countries from './Countries'

const ShowCountries =({countriesToShow, handleSearchChange}) =>{
    if (countriesToShow.length === 1){
        return (
            <Country country={countriesToShow[0]}/>
        )  
      }  
      else if (countriesToShow.length<10 && countriesToShow.length >1) {
        return (
            <Countries countriesToShow={countriesToShow} handleSearchChange={handleSearchChange}/>
        )
      }
      else if (countriesToShow.length>10) {
        return (
           <div>Too many matches, specify another filter</div>
        )
      }
      else {
        return (
           <div>Type a search query into the search field</div>
        )
      }
}

export default ShowCountries