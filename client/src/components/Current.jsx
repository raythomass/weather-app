import {useState ,useEffect} from 'react'
import axios from 'axios'
import FiveDayForecast from './FiveDayForecast'
// const apiKey = import.meta.env.API_KEY;


export default function Current() {
    const [location, setLocation] = useState('')
    const [forecast1, setForecast1] = useState('')
    const [forecast2, setForecast2] = useState('')
    const [forecast3, setForecast3] = useState('')
    const [current, setCurrent] = useState('')
    const [condition, setCondition] = useState('')
    const [search, setSearch] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault()
      fetchCityCoords()
      
    }

    const fetchCityCoords = async () => {
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${search}&days=3&aqi=no&alerts=no`)
            console.log(response.data)
            setCurrent(response.data.current)
            setCondition(response.data.current.condition)
            setForecast1(response.data.forecast.forecastday[0].day)
            setForecast2(response.data.forecast.forecastday[1].day)
            setForecast3(response.data.forecast.forecastday[2].day)
            setLocation(response.data.location)
            // setSearch('')
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {
        fetchCityCoords()
    }, [])


  return (
    <div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
        <div className='location-container'>
          <h1>{location.name}</h1>
          <p>{location.region}</p>
        </div>
        <FiveDayForecast
          key={location} 
          current={current}
          condition={condition}
          forecast1={forecast1}
          forecast2={forecast2}
          forecast3={forecast3}
          location={location}/>
    </div>
  )
}
