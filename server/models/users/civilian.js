const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user')

const civilian = user.discriminator('civilian', new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String, 
        require: true
    },
    vaccine: {
        type: {
            vaccine_type: { type: String },
            date: { type: Date },
            recommended_doses: { type: Number },
            doses_received: { type: Number }
        },
        default: {}
    },
    alerts: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: "alerts"
    },
    is_healthcare_worker: {
        type: Boolean,
        default: false
    },
    infected: {
        type: Boolean,
        default: false
    }
}))

module.exports = mongoose.model('civilian')
