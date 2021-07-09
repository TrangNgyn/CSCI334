const path = require('path');
const role = require('./models/users/role');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    db = require('./models/db'),
    cron_jobs = require('./middleware/cron_jobs')


function initial() {
  db.counters.estimatedDocumentCount((err,count) => {
    if(!err && count===0) {
      for(let i = 0; i < db.COUNTERS.length; i++) {
        new db.counters({
          _id: db.COUNTERS[i].toLowerCase()
        }).save(err => {
          if(err) 
            console.log("error", err)
          console.log(`added ${db.COUNTERS[i]} to the counters collection`)
        })
      }
    }
  })
  db.role.estimatedDocumentCount((err, count)=> {
    if(!err && count === 0) {  
      for(let i = 0; i < db.ROLES.length; i++){
        new role({
          name: db.ROLES[i].toLowerCase()
        }).save(err => {
          if(err) {
            console.log("error", err)
          }
          console.log(`added ${db.ROLES[i]} to roles collection`)
        })
      }
    }
  })
}

// import routers
const auth = require('./routes/auth')
const user = require('./routes/user')
const alert = require('./routes/alert')
const check_in = require('./routes/check_in')
const business = require('./routes/business')
const civilian = require('./routes/civilian')
const organisation = require('./routes/organisation');
const stats = require('./routes/stats')
const org = require('./routes/organisation')

// setup database
db.mongoose
  .connect(process.env.MONGODB_STRING, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB connected...')
    initial()
  })
  .catch(err => console.log(err));

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

// this needs to be changed
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Headers", "Authorization Origin, X-Requested-With, Content-Type, Accept")
  next(); 
});

app.use('/api/user',user)
app.use('/alert',alert)
app.use('/check-in',check_in)

cron_jobs.task.start()

app.use('/auth',auth);
app.use('/business',business);
app.use('/civilian', civilian);
app.use('/organisation', organisation);
app.use('/stats', stats);
app.use('/organisation', org)

// make server object that contain port property and the value for our server.
const server = {
  port: process.env.PORT || 5000
};

// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));