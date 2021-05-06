const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user')

const business_schema = user.extend({
    business_name: {
        required: true,
        type: String,
    },
    address: {
        required: true,
        type: {
            country: {
                type: String,
                default: 'Australia',
            },
            state: {
                type: String,
                deafult: 'NSW',
            },
            city: {
                type: String,
                default: 'Sydney',
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
});

module.exports = business = mongoose.model("business", business_schema);