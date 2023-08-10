const notes = require('express').Router();

//* helper to read and write json files 
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

//*helper to create random number for note id
const uuid = require('../helpers/uuid');

//* GET route to retrieve stored notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received to retrieve stored notes`)
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  }
);

//* POST route to add a new note
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    console.info(`${req.method} request received to create a new note`)
    
    const newNote = {
      title,
      text,
      id: uuid(),
    };
  
    const response = {
      status: 'success',
      body: newNote,
    };

    readAndAppend(newNote, './db/db.json');
    
    console.log(response);
    res.status(201).json(response);
    } else {
      res.status(500).json('Error in creating note');
    }
  });

//* DELETE route for notes
notes.delete('/:id', (req, res) => {
  
  const noteId = req.params.id;
  
  if (noteId) {
    console.info(`${req.method} request received to delete a note`)

    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((dataJSON) => {
      //* takes out array that has the id, and presents new array
      const filteredNote = dataJSON.filter((note) => note.id !== noteId);
      //* updates stored notes with the new array
      writeToFile('./db/db.json', filteredNote);
      res.status(204).json("success");
      console.info('Successfully deleted note');
    })
  } else {
    res.status(500).json('Error in deleting note');
  }
})



//* exports the notes routes
module.exports = notes;