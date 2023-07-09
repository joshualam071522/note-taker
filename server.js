//* standard commands to set up express
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

//* middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* static method to display public folder
app.use(express.static('public'));

//* imports the index routes file
const api = require('./routes/index');
app.use('/api', api);

//* view page for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//* sets to default landing page when user attempts to access an unknown path
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

//* listener for port
app.listen(PORT, () =>
  console.log(`listening at http://localhost:${PORT}`)
);