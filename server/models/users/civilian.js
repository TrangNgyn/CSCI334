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
    cert_ids: {
        type: [String],
        default: []
    },
    infections: {
        type: [String],
        default: []
    },
    alerts: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    check_ins: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: 'check_in'
    }
}))

module.exports = mongoose.model('civilian')
