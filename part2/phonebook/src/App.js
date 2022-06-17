import { useState, useEffect } from 'react';
import axios from 'axios';

import personService from './services/personService';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    let newPerson = {
      name: newName,
      number: number,
    };

    const foundPerson = persons.find(
      (el) => JSON.stringify(el.name) === JSON.stringify(newPerson.name)
    );

    if (!newPerson.name || !newPerson.number) {
      alert('empty name or number field!');
    } else if (!foundPerson) {
      personService
        .addPerson(newPerson)
        .then((data) => setPersons(persons.concat(data)));
    } else {
      if (foundPerson) {
        if (
          window.confirm(
            `${foundPerson.name} is already added to phonebook, replace the old number with a new one ?`
          )
        ) {
          personService
            .updatePerson(foundPerson, newPerson.number)
            .then((response) => '');
          personService.getAll().then((response) => setPersons(response));
        }
      } else {
      }
    }
    setName('');
    setNumber('');
  };

  const showFiltered = (target) =>
    persons.filter((person) =>
      person.name.toLowerCase().startsWith(target.toLowerCase())
    );

  const handleChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    console.log(personToDelete);
    alert(`Delete ${personToDelete.name} ?`);
    personService.deletePerson(id).then((response) => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  const personsToShow = showFiltered(filter);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleChange} />
      <PersonForm
        onSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        number={number}
      />
      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
