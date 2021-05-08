const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    db = require('./models/db')

// import routers
// const civilian_router = require('./routes/civilian');
// const business_router = require('./routes/business');
// const user_router = require('./routes/user');


function initial() {
  db.role.estimatedDocumentCount((err, count)=> {
    if(!err && count === 0) {
      new role({
        name: "user"
      })
      .save(err => {
        if(err) {
          console.log("error", err)
        }
        console.log("added 'user' to roles collection")
      })

      new role({
        name: "admin"
      })
      .save(err => {
        if(err) {
          console.log("error", err)
        }
        console.log("added 'admin' to roles collection")
      })
    }
  })
}

// setup database
db.mongoose
  .connect(process.env.MONGODB_STRING, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB connected...')
    initial()
  })
  .catch(err => console.log(err));

app.use(cors())
app.use(bodyParser.json());
  
require('./routes/auth')(app)
require('./routes/user')(app)

// make server object that contain port property and the value for our server.
const server = {
  port: process.env.PORT || 5000
};

// use the modules


// use router
// app.use('/civilians', civilian_router)
// app.use('/business', business_router)
// app.use('/user', user_router);

// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));