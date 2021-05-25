const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vic_vaccine_data_data_schema = new Schema({
    addressFull: {
        type: String,
        default: "",
    },
    waitPeriodDisp: {
        type: String,
        default: ""
    },
    shortNameClean: {
        type: String,
        default: ""
    }
},
    {
        collection: 'vic_vaccine_locations'
    }
);

module.exports = vic_vaccine_locations_data
    = mongoose.model("vic_vaccine_locations_data", vic_vaccine_data_data_schema);