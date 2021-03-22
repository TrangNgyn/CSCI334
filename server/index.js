const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'); // import mysql module

// import routers
const civilian_router = require('./routes/civilians');

// setup database
db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // running as root
  password: '',
  database: 'csci334' // what should I name the database?
});


// make server object that contain port property and the value for our server.
var server = {
  port: 4040
};

// use the modules
app.use(cors())
app.use(bodyParser.json());

// use router
app.use('/civilians', civilian_router);

// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));