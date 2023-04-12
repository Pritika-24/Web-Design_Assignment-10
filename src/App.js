import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Current from './Components/Current';
import Forecast from './Components/Forecast';


function App() {

  const [city, setCity] = useState('');
  //eslint-disable-next-line
  const [data, setData] = useState('');
  const [current, setCurrent] = useState('');
  const [forecast, setForecast] = useState('');
  const [location, setLocation] = useState('');
  const API_KEY = '1330205bbfbe0e7b33dd8d23826f36f0';
  const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&q=${city}&units=imperial`;

  console.log(weatherURL);

  const searchCity = (event) => {
    console.log(event);
    if (event.key === 'Enter') {
      console.log('enter press here! ')
      axios.get(weatherURL).then((response) => {

        setData(response.data);
      })
    }
  }


//   useEffect(() => {
//     if (data && data.list && data.list.length > 0) {
//       setCurrent(data.list[0]);
//       console.log(data.list);
//       const currentDate = new Date().toISOString().slice(0, 10);
//       const fiveDaysLater = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
//       const filteredForecast = data.list.filter((item) => {
//         const itemDate = item.dt_txt.slice(0, 10);
//         return itemDate >= currentDate && itemDate <= fiveDaysLater;
//       });
//       console.log(filteredForecast);
// /*     // Remove duplicates based on dt
//     const uniqueDt = [...new Set(filteredForecast.map((item) => item.dt))];
//     const uniqueForecast = uniqueDt.map((dt) => {
//       return filteredForecast.find((item) => item.dt === dt);
//     });
//  */
//       setForecast(filteredForecast);
//     }
//   }, [data]);

  useEffect(() => {
    if (data && data.list && data.list.length > 0) {
      setCurrent(data.list[0]);
  
      // Filter forecast data for the next 5 days
      const currentDate = new Date().toISOString().slice(0, 10);
      const fiveDaysLater = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const filteredForecast = data.list.filter((item) => {
        const itemDate = item.dt_txt.slice(0, 10);
        return itemDate >= currentDate && itemDate <= fiveDaysLater;
      });
  
      // Group forecast data by day and add 8 entries per day
      const groupedForecast = [];
      let currentDay = '';
      let dayData = [];
      filteredForecast.forEach((item) => {
        const itemDate = item.dt_txt.slice(0, 10);
        if (itemDate !== currentDay) {
          // Start new day
          if (dayData.length > 0) {
            // Add previous day's data to grouped forecast
            groupedForecast.push(dayData);
          }
          currentDay = itemDate;
          dayData = [item];
        } else {
          // Add 3-hour data to current day
          if (dayData.length < 8) {
            dayData.push(item);
          }
        }
      });
      // Add last day's data to grouped forecast
      if (dayData.length > 0) {
        groupedForecast.push(dayData);
      }
  
      console.log(groupedForecast);
      setForecast(groupedForecast);
    }
  }, [data]);
  

  useEffect(() => {
    if (data && data.city) {
      setLocation(data.city.name);
    }
  }, [data]);


  console.log(current);
  console.log(data);
  console.log(forecast);
  console.log(location);

  return (
    <Router>
      <div className="App">
        <div className="header">
          Pritika's Weather App
        </div>
        <div className="citySearch">
          <h3>Please Enter the City name below : </h3>
          <input
            type="text"
            className="locationInput"
            placeholder="eg: Boston"
            value={city}
            onChange={event => setCity(event.target.value)}
            onKeyDown={searchCity}
          />

          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/Current">Current Weather</Link>
                </li>
                <li>
                  <Link to="/Forecast">Forecasted Weather</Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* {city} */}
          <Routes>
            <Route path="/Current" element={<Current current={current} city={city} location={location} />}></Route>
            <Route path="/Forecast" element={<Forecast forecast={forecast} city={city} location={location} />}></Route>
          </Routes>
          {/* {current && <Current current={current} city={city} location={location} />}
          {forecast && <Forecast forecast={forecast} city={city} location={location} />} */}
        </div>


      </div>
    </Router>
  );
}

export default App;
