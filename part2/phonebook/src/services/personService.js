import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((repsponse) => repsponse.data);
};

const addPerson = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((repsponse) => repsponse.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const updatePerson = (person, number) => {
  const newPerson = { ...person, number: number };
  const request = axios.put(`${baseUrl}/${person.id}`, newPerson);
  return request.then((response) => response.data);
};

export default { getAll, addPerson, deletePerson, updatePerson };
