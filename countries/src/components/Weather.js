import React from "react";

const Weather = ({ weather }) => {
  return (
    <>
      <h4>Weather in {weather.location.name}</h4>
      <p>Temperature: {weather.current.temperature} celsius</p>
      <p>Wind: {weather.current.wind_speed} km/h</p>
    </>
  );
};

export default Weather;
