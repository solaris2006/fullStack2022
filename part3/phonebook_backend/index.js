const express = require('express');
const cors = require('cors');
const { application } = require('express');
const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

let persons = [
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
  {
    name: 'Arto Hellas ',
    number: '0722 22 22',
    id: 5,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => {
    console.log(person);
    return person.id === id;
  });

  if (person) {
    res.json(person);
  } else {
    res.statusMessage = 'User not found';
    res.status(404).end();
  }
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body) {
    res.statusMessage = 'User details missing';
  } else {
    const id = Math.floor(Math.random() * 100000);

    const person = {
      id: id,
      name: body.name,
      number: body.number,
    };
    persons = persons.concat(person);

    res.send(person);
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
