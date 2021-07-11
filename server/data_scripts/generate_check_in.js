var data = require('./load_data')
var bcrypt = require('bcryptjs');
var db = require('../models/db')
var fs = require('fs')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

var salt_rounds = 12;
var seperator = "-"
var check_ins =  []


db.mongoose.connect(process.env.MONGODB_STRING, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})


function random_int(max) {
    return Math.floor(Math.random() * max)
}

async function make_dependents(range) {
    var first_name
    var array =  []
    return await new Promise(resolve => {
        for(let i = 0; i < range; i++) {
            first_name = data.names[random_int(2000)]
            array.push(first_name)
        }
        resolve(array)
    })
}


async function generate() {
    var civs = await db.civilian.find({})
    var buses = await db.business.find({})

    await Promise.all(civs.map(async (item) => {
        for(let i = 0; i < 2; i++) {
            var business =  buses[random_int(1000)]
            var date =  new Date()
            date = date - (60*60*24*(random_int(14))*1000)
            var dependant = []
            dependant = await make_dependents(2)
            var check_in =  new db.check_in({
                dependant,
                date,
                civilian: item._id,
                business: business._id
            })
            check_ins.push(check_in)
        }
    }))
}

async function finish() {
    console.time("Execution Time")
    await generate()
    await db.check_in.insertMany(check_ins)
    console.timeEnd("Execution Time")
    db.mongoose.connection.close()
}

finish()