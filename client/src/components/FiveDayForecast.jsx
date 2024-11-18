import { useEffect } from "react";
import axios from "axios";

const FiveDayForecast = ({current, condition, forecast1, forecast2, forecast3, location}) => {

    return (
        <div className="three-day-forecast">
            <div className="forecast-day">
                <p>{forecast1.date}</p>
                <div className="forecast-day-details">
                    <p>{forecast1.mintemp_f}°F</p>
                    <p>{forecast1.maxtemp_f}°F</p>
                </div>
            </div>
            <div className="forecast-day">
                <p>Day 2</p>
                <div className="forecast-day-details">
                <p>{forecast2.mintemp_f}°F</p>
                <p>{forecast2.maxtemp_f}°F</p>
                </div>
            </div>
            <div className="forecast-day">
                <p>Day 3</p>
                <div className="forecast-day-details">
                <p>{forecast3.mintemp_f}°F</p>
                <p>{forecast3.maxtemp_f}°F</p>
                </div>
            </div>
        </div>
    )
}

export default FiveDayForecast
