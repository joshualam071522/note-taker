const notes = require('express').Router();

//* helper to read and write json files 
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

//*helper to create random number for note id
const uuid = require('../helpers/uuid');

//* GET route to retrieve stored notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  }
);

//* POST route to add a new note
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    
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

//* exports the notes routes
module.exports = notes;