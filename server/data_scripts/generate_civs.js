var data = require('./load_data')
var bcrypt = require('bcrypt');
var db = require('../models/db')
var fs = require('fs')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const crypto = require('crypto')
const QRCode = require('qrcode')

var salt_rounds = 12;
var seperator = "-"
var users =  []
var save_use = []

db.mongoose.connect(process.env.MONGODB_STRING, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})


function random_int(max) {
    return Math.floor(Math.random() * max)
}

async function generate() {

    var civ_id
    await db.role.findOne({name: 'civilian'})
    .then(role => {
        civ_id = role._id
    })

    for(let i = 0; i < 900; i++) {
        var first_name = data.names[random_int(2000)]
        var last_name = data.names[random_int(2000)]
        var password = data.passwords[random_int(100)]
        var email = first_name + seperator + last_name + "@" + data.email
        users.push({
            email: email,
            password: password
        })
        var roles = [civ_id]
        const user = new db.civilian({
            email,
            first_name,
            last_name,
            password: bcrypt.hashSync(password, salt_rounds),
            roles
        })  
        save_use.push(user)
        console.log('User ' + i + ' added')
    }
}

async function finish() {
    console.time('Execution Time')
    await generate()
    await db.civilian.insertMany(save_use)
    users.forEach(element => {
        fs.appendFileSync('./civ-logins', 'email:\t\t' + element.email + '\n'
            + 'password:\t' + element.password + '\n----------\n')
    })
    console.timeEnd('Execution Time')
    db.mongoose.connection.close()
}

finish()
