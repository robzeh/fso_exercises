import React from "react";

import Person from "./Person";

const Persons = ({ persons, handleClick }) => {
  return persons.map((person) => (
    <Person
      key={person.id}
      person={person}
      handleClick={() => handleClick(person.id)}
    />
  ));
};

export default Persons;
