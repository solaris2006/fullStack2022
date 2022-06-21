import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import personService from './services/personService';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';

import {} from 'react-bootstrap';

import { Row, Col, ListGroup, Button, Stack, Alert } from 'react-bootstrap';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessge] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
        .then((data) => {
          setPersons(persons.concat(data));
          showMessage(successMessage, data);
        })
        .catch((error) => {
          console.log(error);
        });
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
    personService
      .deletePerson(id)
      .then((response) => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        setErrorMessage(
          `Information of ${personToDelete.name} has been removed from server`
        );
        setTimeout(() => setErrorMessage(null), 2000);
      });
  };

  const showMessage = (message, person) => {
    if (!message) {
      setSuccessMessge(`Added ${person.name}`);
    }

    setTimeout(() => setSuccessMessge(null), 2000);
  };
  const personsToShow = showFiltered(filter);
  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <Stack gap={3}>
          <Row>
            <Col>
              <h2 className="header text-center">Phonebook</h2>
              {successMessage ? (
                <Alert key="success" variant="success">
                  {successMessage}
                </Alert>
              ) : (
                ''
              )}
              {errorMessage ? (
                <Alert key="danger" variant="danger">
                  {errorMessage}
                </Alert>
              ) : (
                ''
              )}
              <Filter onChange={handleChange} />
              <PersonForm
                onSubmit={addPerson}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                number={number}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <h2 className="header text-justify">Numbers</h2>
              <ListGroup>
                {personsToShow.map((person) => (
                  <ListGroup.Item key={person.name}>
                    <Row>
                      <Col md={8}>
                        <Person person={person} />
                      </Col>
                      <Col md={{ span: 2, offset: 2 }}>
                        <Button
                          variant="danger"
                          onClick={() => deletePerson(person.id)}
                        >
                          delete
                        </Button>{' '}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Stack>
      </Container>
    </Container>
  );
};

export default App;
