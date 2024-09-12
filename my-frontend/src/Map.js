import React, { useState, useEffect } from 'react';
import { Johor, Kedah, Kelantan, Melaka, N9, Pahang, Pinang, Perak, Perlis, Selangor, Terengganu, Sabah, Sarawak, Labuan  } from './States';

import { useNavigate } from 'react-router-dom';


const Map = ({ weatherData }) => {


  const [stateWeather, setStateWeather] = useState({});
  const [tooltip, setTooltip] = useState({ content: '', temp: 0, icon: '', x: 0, y: 0 });

  const navigate = useNavigate(); 

  useEffect(() => {
    
    const weatherMap = weatherData.reduce((acc, data) => {
      acc[data.city] = data; 
      return acc;
    }, {});
    setStateWeather(weatherMap);
  }, [weatherData]);

  const handleMouseMove = (event, stateName, state) => {
    const weather = stateWeather[stateName] || { temperature: 'N/A', condition_icon: 'default' }; 

    setTooltip({
      content: state,
      temp: weather.temperature,
      icon: weather.condition_icon,
      x: event.clientX + 10, 
      y: event.clientY + 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ content: '', temp: 0, icon: '', x: 0, y: 0 });
  };

  const handleClick = (stateName) => {
    navigate(`/state/${stateName}`);  
  };

  return (
    <>
    <div className='map-wrapper'>
      {/* SVG map of Malaysia */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="1000" 
        height="600" 
        viewBox="0 0 800 400"
        style={{ border: "1px solid gray", borderRadius: '4px' }}
      >
        <path
          id="Johor"
          d={Johor}
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'Johor Bahru', 'Johor')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('Johor Bahru')}
        />
        
        <path
          id="Kedah"
          d={ Kedah }
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'Alor Setar', 'Kedah')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('Alor Setar')}
        />

        <path
          id="Kelantan"
          d={ Kelantan }
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'Kota Bharu', 'Kelantan')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('Kota Bharu')}
        />

        <path
          id="Melaka"
          d={ Melaka }
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'Malacca', 'Melaka')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('Malacca')}
        />

        <path
          id="N9"
          d={ N9 }
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'Seremban', 'Negeri Sembilan')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('Seremban')}
        />

        <path
          id="Selangor"
          d={ Selangor }
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'Shah Alam', 'Selangor')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('Shah Alam')}
        />

        <path
          id="Pahang"
          d={ Pahang }
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'Kuantan', 'Pahang')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('Kuantan')}
        />

        <path
          id="Pinang"
          d={ Pinang }
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'George Town', 'Penang')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('George Town')}
        />

        <path
          id="Perak"
          d={ Perak }
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'Ipoh', 'Perak')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('Ipoh')}
        />

        <path
          id="Perlis"
          d={ Perlis }
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'Taiping', 'Perlis')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('Taiping')}
        />

        <path
          id="Terengganu"
          d={ Terengganu }
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'Kuala Terengganu', 'Terengganu')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('Kuala Terengganu')}
        />

        <path
          id="Sabah"
          d={ Sabah }
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'Sandakan', 'Sabah')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('Sandakan')}
        />

        <path
          id="Sarawak"
          d={ Sarawak }
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'Kuching', 'Sarawak')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('Kuching')}
        />

        <path
          id="Labuan"
          d={ Labuan }
          fill="#ccc"
          stroke="#333"
          className="state-path"
          onMouseMove={(e) => handleMouseMove(e, 'Subang Jaya', 'Labuan')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('Subang Jaya')}
        />
      </svg>
    </div>
    {tooltip.content && (
        <div
          className="tooltip"
          style={{
            position: 'absolute',
            top: tooltip.y,
            left: tooltip.x,
            backgroundColor: '#4b5563',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '8px',
            fontSize: '12px',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <div className='icon'>
          <img
            src={`${tooltip.icon}`}
            alt="Weather Icon"
            style={{ width: '50px', height: '50px' }}
          />
          </div>
          <div>
          {tooltip.content} - {tooltip.temp}°C
          </div>
          
        </div>
      )}
    </>
  );
};

export default Map;
