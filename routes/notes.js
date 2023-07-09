const notes = require('express').Router();

//* built-in read/write system that allows us to view files 
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

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