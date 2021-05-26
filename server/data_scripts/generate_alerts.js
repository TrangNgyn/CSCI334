const path = require('path');
const business = require('../models/users/business');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
var db = require('../models/db')


var seperator = "-"
var alerts = []

db.mongoose.connect(process.env.MONGODB_STRING, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

function random_int(max) {
    return Math.floor(Math.random() * max)
}

async function generate() {
    var buses = await db.business.find({}).limit(250)

    await Promise.all(buses.map(async (item) => {
        var business_id = item._id
        var alert_date = new Date()
        alert_date = alert_date - (60*60*24*(random_int(14))*1000)
        var business_name = item.business_name
        var alert = new db.alert({
            business_name,
            gps: item.gps,
            alert_date,
            business_id
        })
        alerts.push(alert)
        
        var found = await db.check_in.find({business: business_id})
        await Promise.all(found.map(async (check_in) => {
            await db.civilian.findById(check_in.civilian)
                .then(civ => {
                    civ.alerts.push(alert)
                    civ.save()
                })
        }))
        
    }))
}

async function finish() {
    console.time("Execution Time")
    await generate()
    await db.alert.insertMany(alerts)
    console.timeEnd("Execution Time")
    db.mongoose.connection.close()
}

finish()