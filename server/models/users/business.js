const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user')

const business = user.discriminator('business', new Schema({
    business_name: {
        required: true,
        type: String,
    },
    // currently generating by hashing (SHA256) the email, the plan is to use the business id in a post request when a QR code is scanned to be used for check in 
    business_id: {
        type: String,
        unique: true
    },
    qr_code: { 
        required: true,
        type: String,
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
    }
}))

// post save bussines
// generate new bus_id

module.exports = mongoose.model("business");