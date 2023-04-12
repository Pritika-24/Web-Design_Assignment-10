import React, { useState } from 'react'
import './Forecast.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearProgress from '@mui/material/LinearProgress';


function Forecast({ forecast, city, location }) {
    const [expanded, setExpanded] = useState(false);
    console.log(forecast);

    //console.log(data_list);
    //const locationFName = `${location.name}, ${location.region}, ${location.country}`
    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
<div className='foreCastSection'>
  {forecast.map(fcast => {
    console.log(fcast);
    const timestamp = fcast[0].dt;
    console.log(timestamp);
    const date = new Date(timestamp * 1000).toLocaleDateString();
    console.log(date);
    const day = new Date(timestamp * 1000).toLocaleString('en-US', { weekday: 'long' });
    console.log(day);
    const imgurl = `https://openweathermap.org/img/wn/${fcast[0].weather[0].icon}.png`

    return (
      <Accordion
        expanded={expanded === date}
        onChange={handleChange(date)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id={date}
        >
          <img src={imgurl} />
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <b>{date} {fcast[0].weather[0].description}</b>
          </Typography>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <b>Temp : {fcast[0].main.temp_min}℉ to {fcast[0].main.temp_max}℉</b>
          </Typography>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <b>Average Humidity : {fcast[0].main.humidity} <br/>
            Feels Like: {fcast[0].main.feels_like}℉</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {fcast.map((curHourForeCast, index) => {
            const hour = new Date(curHourForeCast.dt * 1000).getHours();
            const imgurl = `https://openweathermap.org/img/wn/${curHourForeCast.weather[0].icon}.png`
            return (
              <div className='hourtrack'>
                <b>{hour}:00</b>
                <img src={imgurl} />
                <div className='progress'>
                  <LinearProgress variant="determinate" 
                    value={(curHourForeCast.main.temp_kf * 100) / curHourForeCast.main.temp_max} 
                  />
                  <b>{curHourForeCast.main.temp} ℉</b>
                </div>
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>
    );
  })}
</div>

    )
}

export default Forecast