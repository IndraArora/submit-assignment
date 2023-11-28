import React, { useEffect, useState } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const WeatherApp = () => {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState([]);
  const { ci } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDefaultWeather();
  }, []);

  const getDefaultWeather = async () => {
    try {
      const response = await fetchWeatherData(city);
      setWeatherData(response.list);
    } catch (error) {
      alert("Something went wrong. Please check your internet connection.");
    }
  };

  const fetchWeatherData = async (ci) => {
    const apiKey = "c488e3be95605e00ac5a6c326ab61355";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    );
    return response.json();
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = () => {
    fetchWeatherData(city).then((response) => {
      setWeatherData(response.list);
      navigate(`/weather/${city}`)
    });

  };

  const getDay = (index) => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const dayIndex = (currentDate.getDay() + index) % 7;
    return weekdays[dayIndex];
  };

  return (
    
    <div>
      
      <h1>5 Days Weather Forecast</h1>
      <p id="inputContainer">
        Zipcode: <input type="text" value={city} onChange={handleInputChange} id="cityInput" placeholder="Enter zipcode" />
      </p>
      <button onClick={handleClick}>Get Weather</button>
      <h2 id="cityName">---{city}---</h2>

      <div id="weatherContainer">
        <div id="iconsContainer">
          {weatherData.map((day, index) => (
            <div key={index} className="icons">
              <p className="weather">{getDay(index)}</p>
              <div className="image">
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={`Weather icon for ${day.weather[0].description}`}
                  className="imgClass"
                />
              </div>
              <p className="minValues">Min: {Number(day.main.temp_min - 273.15).toFixed(1)}°</p>
              <p className="maxValues">Max: {Number(day.main.temp_max - 273.15).toFixed(2)}°</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default WeatherApp;
