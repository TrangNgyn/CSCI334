const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user')

const business = user.discriminator('business', new Schema({
    business_name: {
        required: true,
        type: String,
    },
    // this needs to be generated
    business_id: {
        type: String,
        unique: true
    },
    address: {
        required: true,
        type: {
            country: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            street: {
                type: String, 
                required: true,
            },
            street_num: {
                type: Number,
                required: true,
            },
            unit: {
                type: String,
                required: false,
            },
        }
    },
    gps: {
        required: true,
        type: {
            long: {
                required: true,
                type: Number,
            },
            lat: {
                required: true,
                type: Number,
            },
        }
    },
    alerts: {
        type: [Schema.Types.ObjectId],
        default: []
    }
}))

// post save bussines
// generate new bus_id

module.exports = mongoose.model("business");