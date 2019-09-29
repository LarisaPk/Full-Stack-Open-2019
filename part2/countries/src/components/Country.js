import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country =({country}) =>{
const [countrieWeather, setCountrieWeather] = useState([])
 
  // fetches weather for the country
  useEffect(() => {
    console.log('effect for weather')
    axios
      .get(`http://api.weatherstack.com/current?access_key=be55140acc9c49bc6ef5ef350684c494&query=${country.name}`)
      .then(response => {
        console.log('weather promise fulfilled')
        const weather =  response.data
        console.log(weather)
        setCountrieWeather(weather.current)
      })
  },[country.name])
  console.log(countrieWeather.temperature)
  
    return (
        <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>Languages</h2>
          {country.languages.map(language=>
            <li key={language.iso639_1}> {language.name}</li>)}
         <img src={country.flag} style={{width: 200}} alt={'flag'}/>
         <h2>Weather in {country.capital}</h2>
         <p>temperature: {countrieWeather.temperature} Celsius</p>
         <img src={countrieWeather.weather_icons} style={{width: 100}} alt={'weather'}/>
         <p>wind: {countrieWeather.wind_speed} kph direction {countrieWeather.wind_dir}</p>
      </div>      
    )
}

export default Country