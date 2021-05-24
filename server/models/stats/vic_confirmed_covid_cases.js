const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vic_covid_cases_data_schema = new Schema({
    diagnosis_date:{
        type: Date,
        default: Date.now()
    },
    Postcode: {
        type: Number,
        default: 0,
    },
    acquired: {
        type: String,
        default: ""
    },
    Localgovernmentarea: {
        type: String,
        default: ""
    }
},
    {
        collection: 'vic_confirmed_covid_cases'
    }
);

module.exports = vic_covid_cases_data
    = mongoose.model("vic_covid_cases_data", vic_covid_cases_data_schema);