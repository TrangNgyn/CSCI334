const cron = require('node-cron')
const db = require('../models/db')

// create a task that will occur every day at 2359 
var task = cron.schedule("* * * * * *", () => {
    // create new date and set its value to 3 weeks before current time 
    //var end_date = Date.now() - 60 * 60 * 24 * 21 * 1000
    var end_date = Date.now()
    db.alert.deleteMany({alert_date: {$lt: end_date}})
        .then(deleted => {
            if(deleted.deletedCount > 0)
                console.log(`Updated Alerts: deleted ${deleted.deletedCount} documents`)
            console.log(`Updated Alerts: No documents were deleted`)
        })
})

module.exports = { 
    task
}