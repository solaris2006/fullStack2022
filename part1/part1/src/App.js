import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((response) => {
      setNotes(notes.concat(response.data));
      setNewNote('');
    });
  };

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `the note ${note.content} was already deleted from server`
        );

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  // useEffect(() => {
  //   // console.log('effect');

  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       // console.log('promise fulfilled');
  //       setNotes(response.data)
  //   })
  // }, [])

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <fieldset>
          add note <input onChange={handleChange} value={newNote}></input>
          <div>
            {' '}
            <button type="submit"> Add</button>
          </div>
        </fieldset>
      </form>
      <Footer />
    </div>
  );
};

export default App;
