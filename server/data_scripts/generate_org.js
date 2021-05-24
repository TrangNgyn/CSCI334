var data = require('./load_data')
var bcrypt = require('bcrypt');
var db = require('../models/db')
var fs = require('fs')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

var salt_rounds = 12;
var seperator = "-"
var orgs =  []
var save_org = []

db.mongoose.connect(process.env.MONGODB_STRING, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})


function random_int(max) {
    return Math.floor(Math.random() * max)
}

async function generate() {

    var healthcare_workers = await db.civilian.find({is_healtcare_worker: true})

    var org_id
    await db.role.findOne({name: 'organisation'})
    .then(role => {
        org_id = role._id
    })

    for(let i = 0; i < 1; i++) {
        var first_name = data.names[random_int(2000)]
        var last_name = data.names[random_int(2000)]
        var password = data.passwords[random_int(100)]
        var organisation_name =  first_name + seperator + last_name
        var email = first_name + seperator + last_name + "@" + data.email
        orgs.push({
            email: email,
            password: password
        })
        var roles = [org_id]
        var employees = []
        for(let k=0;i<5;i++){
            employees.push(healthcare_workers[k+i*5])
        }
        const organisation = new db.organisation({
            email,
            organisation_name,
            verified: true,
            password: bcrypt.hashSync(password, salt_rounds),
            roles
        })  
        save_org.push(organisation)
        console.log('Organisation ' + i + ' added')
    }
}

async function finish() {
    console.time('Execution Time')
    await generate()
    await db.organisation.insertMany(save_org)
    orgs.forEach(element => {
        fs.appendFileSync('./org-logins', 'email:\t\t' + element.email + '\n'
            + 'password:\t' + element.password + '\n----------\n')
    })
    console.timeEnd('Execution Time')
    db.mongoose.connection.close()
}

finish()
