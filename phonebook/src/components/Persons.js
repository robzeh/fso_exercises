import React from "react";

const Persons = ({ persons }) => {
  return persons.map((person) => <div key={person.id}>{person.name}</div>);
};
// persons.map((person) => <Person key={person.id} person={person} />);

export default Persons;
