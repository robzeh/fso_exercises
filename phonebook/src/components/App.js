import React, { useState, useEffect } from "react";
import axios from "axios";

import Persons from "./Persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Results from "./Results";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("fulfilled");
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.filter((person) => person.name === newName);

    if (existingPerson.length === 0) {
      const person = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
    } else {
      window.alert(`${newName} is already in`);
    }
  };

  const handleNewPerson = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleNewFilter = (event) => setNewFilter(event.target.value);

  // const peopleToShow =
  //   filter === ""
  //     ? persons
  //     : persons.filter((person) =>
  //         person.name.toLowerCase().includes(filter.toLowerCase())
  //       );

  const peopleToShow = () => {
    // let result = "";
    // if (persons.length > 0) {
    // let filterPersons = persons.filter((person) =>
    //   person.name.toLowerCase().includes(filter.toLowerCase())
    // );
    // }

    let filterPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );

    const result = <Persons persons={filterPersons} />;

    return result;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameSearch={filter} handleNameSearch={handleNewFilter} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewPerson={handleNewPerson}
        handleNewNumber={handleNewNumber}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Results results={peopleToShow()} />
    </div>
  );
};

export default App;
