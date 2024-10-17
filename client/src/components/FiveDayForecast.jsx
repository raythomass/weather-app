import { useEffect } from "react";
import axios from "axios";

const FiveDayForecast = ({search}) => {

    const fiveDayForecast = async () => {
        //GEOCODING LOCATION NAME TO GET COORDINATES
        const coords = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${import.meta.env.VITE_API_KEY}&units=imperial`);
        console.log(coords.data)

        //USING LAT AND LON TO GET CITY WEATHER DATA
        const response = `api.openweathermap.org/data/2.5/forecast?lat=${coords.data[0].lat}&lon=${coords.data[0].lon}&appid=${import.meta.env.VITE_API_KEY}`
        console.log(response.data)
    }

    useEffect(() => {
        fiveDayForecast()
    },[])

    return (
        <div>
            <p>Five Day Forecast</p>
        </div>
    )
}

export default FiveDayForecast
