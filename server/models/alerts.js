const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const counters = require('./counters');

const alert_schema = new Schema({
    place_id: { 
        required: false,
        type: String,
    },
    gps: {
        required: true,
        type: {
            lat: {
                required: true,
                type: Number,
            },
            lng: {
                required: true,
                type: Number,
            },
        }
    },
    business_id: {
        type: Schema.Types.ObjectId,
        ref: 'business'
    },
    time_end: {
        type: Date,
    },
    alert_date: {
        type: Date,
    }
},
{
    collection: "alerts"
})

alert_schema.pre('save', function (next) {
    var doc = this
    // set the time of the alert and the end time of the alert to be 2 weeks from now
    var t_date = new Date();
    t_date = new Date()
    t_date = Date.now()
    doc.alert_date = t_date
    doc.time_end = t_date + 60 * 60 * 24 * 14 * 1000
    next()
})

module.exports = alerts = mongoose.model('alerts', alert_schema);
