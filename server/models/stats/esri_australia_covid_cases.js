const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const esri_australia_covid_data_schema = new Schema({
    Date:{
        type: Date,
        default: Date.now()
    },
    NSW: {
        type: Number,
        default: 0
    },
    VIC: {
        type: Number,
        default: 0
    },
    QLD: {
        type: Number,
        default: 0
    },
    SA: {
        type: Number,
        default: 0
    },
    WA: {
        type: Number,
        default: 0
    },
    TAS: {
        type: Number,
        default: 0
    },
    NT: {
        type: Number,
        default: 0
    },
    ACT: {
        type: Number,
        default: 0
    },
    Total_Cases: {
        type: Number,
        default: 0
    },
    NSW_Deaths: {
        type: Number,
        default: 0
    },
    VIC_Deaths: {
        type: Number,
        default: 0
    },
    QLD_Deaths: {
        type: Number,
        default: 0
    },
    SA_Deaths: {
        type: Number,
        default: 0
    },
    WA_Deaths: {
        type: Number,
        default: 0
    },
    TAS_Deaths: {
        type: Number,
        default: 0
    },
    ACT_Deaths: {
        type: Number,
        default: 0
    },
    Total_Deaths: {
        type: Number,
        default: 0
    },
    NSW_Tests: {
        type: Number,
        default: 0
    },
    VIC_Tests: {
        type: Number,
        default: 0
    },
    QLD_Tests: {
        type: Number,
        default: 0
    },
    SA_Tests: {
        type: Number,
        default: 0
    },
    WA_Tests: {
        type: Number,
        default: 0
    },
    TAS_Tests: {
        type: Number,
        default: 0
    }
},
    {
        collection: 'esri_australia_covid_cases'
    }
);

module.exports = esri_australia_covid_data
    = mongoose.model("esri_australia_covid_data", esri_australia_covid_data_schema);