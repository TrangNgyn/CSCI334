const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const confirmed_cases_location_schema = new Schema({
    notification_date: {
        type: Date,
        default: Date.now(),
    },
    postcode: {
        type: Number,
        default: 0
    },
    lhd_2010_code: {
        type: String,
        default: ""
    },
    lhd_2010_name: {
        type: String,
        default: ""
    },
    lga_code19: {
        type: Number,
        default: 0
    },
    lga_name19: {
        type: String,
        default: ""
    }
},
    {
        collection: 'confirmed_covid_cases_locations'
    }
);

module.exports = confirmed_cases_locations 
    = mongoose.model("confirmed_cases_locations", confirmed_cases_location_schema);