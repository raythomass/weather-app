import { useEffect } from "react";
import axios from "axios";

const FiveDayForecast = ({current, condition, forecast1, forecast2, forecast3, location}) => {

    // const fiveDayForecast = async () => {
    //     try {
    //     } catch (error) {
    //     }
    // }

    // useEffect(() => {
    //     fiveDayForecast()
    // },[])

    return (
        <div>
            <p>Three Day Forecast</p>
            <p>{location.name}</p>
            <p>{condition.text}</p>
            <p>{current.cloud}</p>
            <p>{forecast1.maxtemp_f}</p>
            <p>{forecast2.maxtemp_f}</p>
            <p>{forecast3.maxtemp_f}</p>
        </div>
    )
}

export default FiveDayForecast
