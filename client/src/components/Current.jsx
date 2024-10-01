import {useState ,useEffect} from 'react'
import axios from 'axios'

// a20a289672fbb48069f510904d9915b7


export default function Current() {
    const [location, setLocation] = useState('')
    const [main, setMain] = useState('')

    const fetchCityCoords = async () => {
        try {
            //GEOCODING LOCATION NAME TO GET COORDINATES
            const coords = await axios.get('http://api.openweathermap.org/geo/1.0/direct?q=Phoenix&limit=5&appid=a20a289672fbb48069f510904d9915b7&units=imperial');
            console.log(coords.data)

            //USING LAT AND LON TO GET CITY WEATHER DATA
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.data[0].lat}&lon=${coords.data[0].lon}&appid=a20a289672fbb48069f510904d9915b7&units=imperial`)
            console.log(response.data)
            setLocation(response.data)
            setMain(response.data.main)
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {
        fetchCityCoords()
    }, [])


  return (
    <div>
        <p>{location.name}</p>
        <p>{main.temp}</p>
    </div>
  )
}
