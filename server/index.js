const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')

// import routers
const civilian_router = require('./routes/civilians');

// setup database
mongoose
  .connect(process.env.MONGODB_STRING, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// make server object that contain port property and the value for our server.
const server = {
  port: process.env.PORT || 5000
};

// use the modules
app.use(cors())
app.use(bodyParser.json());

// use router
app.use('/civilians', civilian_router);

// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));