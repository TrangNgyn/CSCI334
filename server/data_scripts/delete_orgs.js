const db = require('../models/db')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

db.mongoose.connect(process.env.MONGODB_STRING, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

// db.organisation.deleteMany({})
//     .then(found => {
//         console.log(found)
//     })

// db.admin.deleteOne({email: "admin@email.com"})
//     .then(found => {
//         console.log(found)
//     })