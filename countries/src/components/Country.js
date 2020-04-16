import React from "react";
import Weather from "./Weather";

const Country = ({ country, weather }) => {
  if (weather.location !== undefined) {
    return (
      <>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h4>Languages</h4>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} className="flag" alt="flag" />
        <Weather weather={weather} />
      </>
    );
  } else {
    return <>loading...</>;
  }
};

export default Country;
