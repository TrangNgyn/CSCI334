var data = require('./load_data')
var bcrypt = require('bcrypt');
var db = require('../models/db')
var fs = require('fs')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });



var salt_rounds = 12;

function random_int(max) {
    return Math.floor(Math.random() * max)
}

var seperator = "-"
var users =  []

db.mongoose.connect(process.env.MONGODB_STRING, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

for(let i = 0; i < 2; i++) {
    var first_name = data.names[random_int(1000)]
    var last_name = data.names[random_int(1000)]
    var password = data.passwords[random_int(100)]
    //var password =  'CustomerPassword@1'
    var email = first_name + seperator + last_name + "@" + data.email
    users.push({
        email: email,
        password: password
    })
    var roles =  []
    roles.push('60a3242c7cd3b45470e3a248') // get the role first from the db before running

    const user = new db.civilian({
        email,
        first_name,
        last_name,
        password: bcrypt.hashSync(password, salt_rounds),
        roles
    })  
    user.save()
}

users.forEach(element => {
    fs.appendFileSync('./civ-logins', 'email:\t\t' + element.email + '\n'
        + 'password:\t' + element.password + '\n----------\n')
})
console.log('done')
