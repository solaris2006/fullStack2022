import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";




const App = () => {


  const [persons, setPersons] = useState([
    ]);

  const [newName, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data)
      })


  }, [])

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

    if (!newPerson.name || !newPerson.number) {
      alert("empty name or number field!");
    } else if (
      !persons.find((el) => JSON.stringify(el) === JSON.stringify(newPerson))
    ) {
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newName} is already added to pohnebook!`);
    }

    setName("");
    setNumber("");
  };

  const showFiltered = (target) =>
    persons.filter((person) =>
      person.name.toLowerCase().startsWith(target.toLowerCase())
    );

  const handleChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
   
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

      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
