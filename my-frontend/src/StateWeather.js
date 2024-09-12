import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StateWeather = () => {

    const { stateName } = useParams();  
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
          try {
            setLoading(true);
            console.log(stateName);
            
            const response = await axios.get(`http://127.0.0.1:8000/api/weather/`, {
                params: { state: stateName },
            });

            console.log("Response data:", response.data);
            setWeatherData(response.data);
          } catch (err) {
            setError('Error fetching weather data');
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchWeatherData();
      }, [stateName]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!weatherData || !weatherData.weather_data || weatherData.weather_data.length === 0) {
        return <div>No data available for {stateName}</div>;
    }

    return (
    <div className='wrapper'>
        <h1>Weather in {stateName}</h1>
        {weatherData.weather_data.map((dayData, index) => (
            <div className='temp-box' key={index}>
                <h2>Date: {dayData.date}</h2>
                {dayData.weather.map((weatherItem, idx) => (
                    <div key={idx}>
                        <p className='temp'>Temperature: {weatherItem.temperature}</p>
                        <img src={weatherItem.condition_icon} alt="weather icon" />
                    </div>
                ))}
            </div>
        ))}
    </div>
    );
};

export default StateWeather;
