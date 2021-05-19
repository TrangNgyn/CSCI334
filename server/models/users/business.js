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
        type: String,
    },
    // locations such as businesses, parks etc. may have a place id; It's possible for one location to have multiple place id's. Place id's may also change over time
    // Because of this we should mainly rely on the lat/lng
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
    alerts: {
        type: [Schema.Types.ObjectId],
        default: []
    }
}))

// post save bussines
// generate new bus_id

module.exports = mongoose.model("business");