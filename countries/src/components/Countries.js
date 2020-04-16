import React from "react";

const Countries = ({ countries, handleClick }) => {
  return countries.map((country) => (
    <div key={country.name}>
      {country.name}
      <button onClick={handleClick}>show</button>
    </div>
  ));
};

export default Countries;
