const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user');

const organisation = user.discriminator('organisation', new Schema({
    organisation_name: {
        type: String,
        required: true
    },
    employees: {
        type: [Schema.Types.ObjectId],
        ref: 'user'
    },
    qr: {
        type: String
    },
    verifed: {
        type: Boolean,
        required: true,
        default: false
    }
}))

module.exports = mongoose.model("organisation")