import React, { useState, useEffect } from "react";

import Persons from "./Persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Results from "./Results";
import Notification from "./Notification";

import personService from "../services/people";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const updatePerson = (id, number) => {
    const people = persons.find((p) => p.id === id);
    const changedPerson = { ...people, number: number };

    personService.update(id, changedPerson).then((returnedPerson) => {
      setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)));
    });
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.filter((person) => person.name === newName);
    console.log(existingPerson);

    if (existingPerson.length === 0) {
      const person = {
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id + 1,
      };

      personService.create(person).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });

      showNotification(person, false);
    } else {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace old number with new?`
        )
      ) {
        updatePerson(existingPerson[0].id, newNumber);
      }
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
      showNotification(personToDelete.name, false);
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

  const showNotification = (message, isError) => {
    if (isError) {
      setErrorMessage(`${message.name} was already added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      setErrorMessage(`${message.name} was succesfully added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <Notification message={errorMessage} />
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
