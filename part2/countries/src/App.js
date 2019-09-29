import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShowCountries from './components/ShowCountries'

function App() {
  const [countriesInfo, setCountriesInfo] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])

// fetches all countries info and sets the state
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountriesInfo(response.data)
      })
  }, [])
  console.log('render', countriesInfo.length, 'countries')
  
  //sets search value to state, filters and sets countries to show to state
  const handleSearchChange =(e)=>{
    console.log(e.target.value)
    setSearchTerm(e.target.value)

    setCountriesToShow(countriesInfo.filter(country =>
    country.name
    .toLowerCase()
    .includes(e.target.value.toLowerCase())))
  }  

  return (
    <>
      <div>
        find countries<input value={searchTerm} onChange={handleSearchChange}/>
      </div>
      <ShowCountries countriesToShow={countriesToShow} handleSearchChange={handleSearchChange} />
    </>
  );
}

export default App;
