import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchItem, setSearchItem] = useState('')
  const [selectCountry, setSelectCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (searchItem.trim() === '') {
      setCountries([])
      return
    }

    const fetchData = async () => {
      try {
        const someUrl = `https://restcountries.com/v3.1/name/${searchItem}`
        const response = await axios.get(someUrl)
        console.log(response.data)
        setCountries(response.data)
        setSelectedCountry(null)
        setWeather(null)

        if (response.data.length === 1) {
            const capital = response.data[0].capital && response.data[0].capital[0]
            fetchWeatherData(capital)
        }
      }
      catch (error) {
        console.error('Error fetching data: ', error.data)
      }
    }
    fetchData()
  }, [searchItem])

  const renderLanguages = (languages) => {
    if (Array.isArray(languages)) {
      return languages.join(', ')
    }
    else if (typeof languages === 'object') {
      return Object.values(languages).join(', ')
    }
    else {
      return 'Unknown'
    }
  }

  const fetchWeatherData = async (capital) => {
    try {
      const apiKey = import.meta.env.VITE_SOME_KEY
      const v2_5 = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      const weatherResponse = await axios.get(v2_5)
      setWeather(weatherResponse.data)
      setApiError(null)
    }
    catch (error) {
      console.error("Error fetching weather data", error.data)
      setWeather(null)
      setApiError("Failed to fetch weather data")
    }
  }

  const handleCountry = (country) => {
    setSelectCountry(country)
    const capital = country.capital
    fetchWeatherData(capital)
  }

  return (
    <div>
      <h1>Country Information App</h1>
      <label>
        Search for a country: <input 
        type = 'text' 
        value = {searchItem}
        onChange = {(e) => setSearchItem(e.target.value)} />
      </label>
      
      {countries.length > 10 && (<p>Too many countries, specify another filter</p>)}

      {countries.length <= 10 && countries.length > 1 && (
        <div>
          <h3>Matching Countries: </h3>
          <ul>
            {countries.map(country => (
              <li key = {country.name.common}>{country.name.common} <button onClick = {() => handleCountry(country)}>Show country data</button></li>
            ))}
          </ul>
          </div>
      )}

      {selectCountry && (
        <div>
          <h3>{selectCountry.name.common}</h3>
          <p>Capital: {selectCountry.capital}</p>
          <p>Area: {selectCountry.area}</p>
          <p>Languages: {selectCountry.languages && renderLanguages(selectCountry.languages)}</p>
          <p>Flag:</p>
          {<img src = {selectCountry.flags.png} alt = {`${selectCountry.name.common}'s flag`}></img>}
          <p>Weather Map Data</p>
          {
            weather && (
              <div>
                <h3>Weather in: {selectCountry.capital[0]}</h3>
                <p>Temperature: {weather.main.temp}°C</p>
                <p>Humidity: {weather.main.humidity}</p>
                <p>Wind: {weather.wind.speed}</p>
                <p>Weather Description: {weather.weather[0].description}</p>
                <p>Weather Icon: </p>
                  {
                    weather.weather[0].icon && (
                      <img src = {`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt = "Weather Icon">

                      </img>
                    )
                  }
              </div>
            )
          }

          {apiError && <p>{apiError}</p>}
        </div>
      )}

      {countries.length===1 && (
        <div>
          <h3>{countries[0].name.common}</h3>
          <p>Capital: {countries[0].capital}</p>
          <p>Area: {countries[0].area}</p>
          <p>Languages: {countries[0].languages && renderLanguages(countries[0].languages)}</p>
          <p>Flag:</p>
          {<img src = {countries[0].flags.png} alt = {`${countries[0].name.common}'s flag`}></img>}
          <p>Weather Map Data</p>
          {weather && (
              <div>
                <h3>Weather in: {countries[0].capital[0]}</h3>
                <p>Temperature: {weather.main.temp}°C</p>
                <p>Humidity: {weather.main.humidity}</p>
                <p>Wind: {weather.wind.speed}</p>
                <p>Weather Description: {weather.weather[0].description}</p>
                <p>Weather Icon: </p>
                  {
                    weather.weather[0].icon && (
                      <img src = {`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt = "Weather Icon">

                      </img>
                    )
                  }
              </div>
            )
          }

          {apiError && <p>{apiError}</p>}
        </div>
      )}  
    </div>
  )
}

export default App
