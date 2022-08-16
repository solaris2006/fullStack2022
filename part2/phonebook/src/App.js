import { useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();

    const nameObj = {
      name: newName,
      number: newNumber,
    };

    const found = persons.find(
      (el) => JSON.stringify(el) === JSON.stringify(nameObj)
    );

    if (found) {
      alert(`${nameObj.name} already exists in phonebook`);
    } else if (!newName) {
      alert("you must enter a  name!");
    } else {
      setPersons(persons.concat(nameObj));
      setNewName("");
      setFilter("");
    }
  };

  const filterNumbers = (e) => {
    if (e.target.value) {
      setFilter(e.target.value);
      console.log(filter);
    } else {
      setFilter("");
    }
  };

  const personsToShow = filter
    ? persons.filter((el) =>
        el.name.toLowerCase().startsWith(filter.toLowerCase())
      )
    : persons;

  console.log(personsToShow);
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterNumbers={filterNumbers} />
      <h3>Add a new</h3>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
