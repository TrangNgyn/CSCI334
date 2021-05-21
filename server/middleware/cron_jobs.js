const cron = require('node-cron')
const db = require('../models/db')

var task = cron.schedule("46 * * * *", () => {
    db.alert.find({})
        .then(found => {
            console.log(found)
        })
})

module.exports = { 
    task
}