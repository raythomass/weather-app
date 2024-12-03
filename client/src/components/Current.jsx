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
    const [forecastTwoCondition, setForecastTwoCondition] = useState('')
    const [forecastThree, setForecastThree] = useState('')
    const [forecastThreeCondition, setForecastThreeCondition] = useState('')


    // const currentDate = moment().calendar(); 
    const currentDate = moment().format('MMMM Do YYYY, h:mm a');
    const dayOne = moment().add(1, 'days').calendar(); 
    const dayTwo = moment().add(2, 'days').calendar();
    const dayThree = moment().add(3, 'days').calendar();  

    const handleSubmit = async (e) => {
      e.preventDefault()
      fetchCityCoords()
    }

    const Name = () => {
      if( location.name == location.region ) {
        return <span className='name'>{location.country}</span>
      }

      return <span className='name'>{location.region}</span>
    }


    const fetchCityCoords = async () => {
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${search}&days=3&aqi=no&alerts=no`)
            console.log(response.data)
            setCurrent(response.data.current)
            setCurrentCondition(response.data.current.condition)
            setForecastOne(response.data.forecast.forecastday[0].day)
            setForecastOneCondition(response.data.forecast.forecastday[0].day.condition)
            setForecastTwo(response.data.forecast.forecastday[1].day)
            setForecastTwoCondition(response.data.forecast.forecastday[1].day.condition)
            setForecastThree(response.data.forecast.forecastday[2].day)
            setForecastThreeCondition(response.data.forecast.forecastday[2].day.condition)
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
          <div className='current-header'>
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
          <div className='current-details'>
            <div className='temperature-details'>
              <h4>Temperature:</h4>
              <p>Current: {current.temp_f}°F</p>
              <p>Feels Like: {current.feelslike_f}°F</p>
              <p>Wind Chill: {current.windchill_f}°F</p>
            </div>
            <div className='wind-details'>
              <h4>Wind:</h4>
              <p>Speed: {current.wind_mph} mph</p>
              <p>Direction: "{current.wind_dir}"</p>
              <p>Gust: {current.gust_mph} mph</p>
            </div>
            <div className='current-wind'>
              <h4>Misc:</h4>
              <p>Humidity: {current.humidity}%</p>
              <p>Visibility: {current.vis_miles} Miles</p>
              <p>UV Index: {current.uv}</p>
            </div>
          </div>

          {/* <div className='forecast-section'>
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
          </div> */}
        </div>
        <div className='three-day'>
          <div className='day'>
            <div className='day-details'>
              <p>{dayOne}</p>
              <div className='forecast-condition'>
                <img src={forecastOneCondition.icon} alt="Weather data by WeatherAPI.com" border="0"/>
                <h2>{forecastOne.avgtemp_f}°F</h2>
              </div>
            </div>
          </div>
          <div className='day'>
          <div className='day-details'>
              <p>{dayTwo}</p>
              <div className='forecast-condition'>
                <img src={forecastTwoCondition.icon} alt="Weather data by WeatherAPI.com" border="0"/>
                <h2>{forecastTwo.avgtemp_f}°F</h2>
              </div>
            </div>
          </div>
          <div className='day'>
          <div className='day-details'>
              <p>{dayThree}</p>
              <div className='forecast-condition'>
                <img src={forecastThreeCondition.icon} alt="Weather data by WeatherAPI.com" border="0"/>
                <h2>{forecastThree.avgtemp_f}°F</h2>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
