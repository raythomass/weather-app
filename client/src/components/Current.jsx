import {useState ,useEffect} from 'react'
import axios from 'axios'
import FiveDayForecast from './FiveDayForecast'
import moment from 'moment'
// const apiKey = import.meta.env.API_KEY;


export default function Current() {
    const [location, setLocation] = useState('')
    const [search, setSearch] = useState('Los Angeles')
    const [current, setCurrent] = useState('')
    const [currentCondition, setCurrentCondition] = useState('')
    const [forecastOne, setForecastOne] = useState('')
    const [forecastOneCondition, setForecastOneCondition] = useState('')
    const [forecastTwo, setForecastTwo] = useState('')
    const [forecastThree, setForecastThree] = useState('')


    const currentDate = moment().calendar(); 
    const dayOne = moment().add(1, 'days').calendar(); 
    const dayTwo = moment().add(2, 'days').calendar();
    const dayThree = moment().add(3, 'days').calendar();  

    const handleSubmit = async (e) => {
      e.preventDefault()
      fetchCityCoords()
    }

    const Name = () => {
      if( location.name == location.region ) {
        return <span>{location.country}</span>
      }

      return <span>{location.region}</span>
    }


    const fetchCityCoords = async () => {
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${search}&days=3&aqi=no&alerts=no`)
            console.log(response.data)
            setCurrent(response.data.current)
            setCurrentCondition(response.data.current.condition)
            setForecastOne(response.data.forecast.forecastday[0].day)
            setForecastOneCondition(response.data.forecast.forecastday[0].day.condition)
            setForecastTwo(response.data.forecast.forecastday[1].day)
            setForecastThree(response.data.forecast.forecastday[2].day)
            setLocation(response.data.location)
            setSearch('')
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {
        fetchCityCoords()
    }, [])


  return (
    <div className='page-container'>
        <div className='form-container'>
          <form className='search-form' onSubmit={handleSubmit}>
            <input
              type='text'
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </form>
        </div>
        <div className='weather-container'>
          <div className='current-details'>
            <div>
              <h1>{location.name}, <Name/> </h1>
              <h4>{currentDate}</h4>
              <p>{currentCondition.text}</p>
            </div>
            <div className='current-temperature'>
              <img src={currentCondition.icon} alt="Weather data by WeatherAPI.com" border="0"/>
              <h1>{current.temp_f}<span>°F</span></h1>
            </div>
          </div>

          <div className='forecast-section'>
            {/* <h4>Three Day Forecast</h4> */}
            <div className='forecast-container'>
              <div className='forecast-one-div'>
                <p>{dayOne}</p>
                <h3>{forecastOne.avgtemp_f}°F</h3>
                <p>Low: {forecastOne.mintemp_f}°F</p>
                <p>High: {forecastOne.maxtemp_f}°F</p>
                <h1></h1>
              </div>
              <div className='forecast-two-div'>
                <p>{dayTwo}</p>
                <h3>{forecastTwo.avgtemp_f}°F</h3>
                <p>Low: {forecastTwo.mintemp_f}°F</p>
                <p>High: {forecastTwo.maxtemp_f}°F</p>
              </div>
              <div className='forecast-three-div'>
                <p>{dayThree}</p>
                <h3>{forecastThree.avgtemp_f}°F</h3>
                <p>Low: {forecastThree.mintemp_f}°F</p>
                <p>High: {forecastThree.maxtemp_f}°F</p>
              </div>
            </div>
          </div>
        </div>
        <div className='three-day'>
          <div className='day'>
            <p>{dayOne}</p>
              <div className='forecast-condition'>
                <img src={forecastOneCondition.icon} alt="Weather data by WeatherAPI.com" border="0"/>
                <h2>{forecastOne.avgtemp_f}</h2>
              </div>
          </div>
        </div>
    </div>
  )
}
