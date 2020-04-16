import React, { useState, useEffect } from "react";

import Persons from "./Persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Results from "./Results";

import personService from "../services/people";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.filter((person) => person.name === newName);

    if (existingPerson.length === 0) {
      const person = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      personService.create(person).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    } else {
      window.alert(`${newName} is already in`);
    }
  };

  const handleNewPerson = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleNewFilter = (event) => setNewFilter(event.target.value);
  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (
      window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)
    ) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const peopleToShow = () => {
    let filterPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );

    const result = (
      <Persons persons={filterPersons} handleClick={handleDeletePerson} />
    );

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
