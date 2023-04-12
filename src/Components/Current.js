import React from 'react'
import './Current.css'
function Current({current, city, location}) {
    console.log(current);
    console.log(city);
    console.log(current.weather[0].icon);
    const imgurl = `https://openweathermap.org/img/wn/${current.weather[0].icon}.png`
  return (
    <div className = "current">
        <b>{city}</b>
        <br/>
        <b>{location.localtime}</b>
        <br/>
        <b>Weather</b>
        <div className="currentBody">
            <img src = { imgurl }/>
            <span>
                <b>{current.weather[0].description}</b>
            </span>
            <span>
                <b>Temp : </b>
                {current.main.temp}℉
            </span>
            <span>
                <b>FeelsLike : </b>
                {current.main.feels_like}℉
            </span>
            <span>
                <b>Humidity : </b>
                {current.main.humidity}
            </span>
            <span>
                <b>Wind Speed : </b>
                {current.wind.speed}mph
            </span>
            <span>
                <b>Visibility : </b>
                {current.visibility}
            </span>


        </div>
    </div>
  )
}

export default Current