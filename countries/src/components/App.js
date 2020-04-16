import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import Results from "./Results";
import Countries from "./Countries";
import Country from "./Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [capital, setCapital] = useState("");
  const [weather, setWeather] = useState(undefined);

  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      let countries = response.data;
      console.log(countries);
      setCountries(countries);
    });
  };

  useEffect(hook, []);

  const weatherHook = () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const API_LINK = `https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`;
    axios.get(API_LINK).then((response) => {
      console.log(capital);
      console.log(response.data);
      setWeather(response.data);
    });
  };

  useEffect(weatherHook, [capital]);

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleClick = (e) =>
    setFilter(e.target.previousSibling.textContent.toLowerCase());

  const showResults = () => {
    let result = "";
    if (countries.length > 0) {
      let filterCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      );

      if (filterCountries.length > 1 && filterCountries.length <= 10) {
        result = (
          <Countries countries={filterCountries} handleClick={handleClick} />
        );
      } else if (filterCountries.length === 1) {
        if (capital !== filterCountries[0].capital) {
          setCapital(filterCountries[0].capital);
        }

        result = <Country country={filterCountries[0]} weather={weather} />;
      }
    }

    return result;
  };

  return (
    <>
      <Filter filter={filter} filterChange={handleFilterChange} />
      <Results results={showResults()} />
    </>
  );
};

export default App;
