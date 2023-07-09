const express = require('express');

//* imports notes router
const notesRouter = require('./notes');

//*creates express instance
const app = express();

//* middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* allows user to use the note route
app.use('/notes', notesRouter)


//* exports the express instance with the notes routes
module.exports = app;