const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alert_schema = new Schema({
    alert_id: {
        type: String, 
        required: true,
        unique: true
    },
    loaction_gps: {
        type: String,
        required: true
    },
    business_id: {
        type: Schema.Types.ObjectId,
        ref: 'business'
    },
    time_end: {
        type: Date,
        requied: true
    },
    date: {
        type: Date,
        required: true
    }, 
    virus: {
        type: String,
        required: true
    }
})

// post save create a 
// date = Date.now()
// time_end = Date.now() + 2weeks 

module.exports = alerts = mongoose.model('alerts', alert_schema);
