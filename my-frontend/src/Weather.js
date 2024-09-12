import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    
    axios.get('http://127.0.0.1:8000/api/weather/')
      .then(response => {
        setWeatherData(response.data.weather);
      })
      .catch(error => {
        console.error('There was an error fetching the weather data!', error);
      });
  }, []);

  return (
    <div className='weather-wrapper'>
      <h1 >Malaysia Weather Forecast</h1>
      <Map weatherData={weatherData}/>
    </div>
  );
};

export default Weather;
