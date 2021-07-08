const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aus_owid_data_schema = new Schema({
    iso_code:{
        type: String,
        default: ""
    },
    continent: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now()
    },
    total_cases: {
        type: Number,
        default: 0,
    },
    new_cases: {
        type: Number,
        default: 0
    },
    total_cases_per_million: {
        type: Number,
        default: 0
    },
    new_cases_per_million: {
        type: Number,
        default: 0
    },
    stringency_index: {
        type: Number,
        default: 0
    },
    population: {
        type: Number,
        default: 0
    },
    population_density: {
        type: Number,
        default: 0
    },
    median_age: {
        type: Number,
        default: 0
    },
    aged_65_older: {
        type: Number,
        default: 0
    },
    gdp_per_capita: {
        type: Number,
        default: 0
    },
    extreme_poverty: {
        type: Number,
        default: 0
    },
    cardiovasc_death_rate: {
        type: Number,
        default: 0
    },
    diabetes_prevalence: {
        type: Number,
        default: 0
    },
    female_smokers: {
        type: Number,
        default: 0
    },
    male_smokers: {
        type: Number,
        default: 0
    },
    hospital_beds_per_thousand: {
        type: Number,
        default: 0
    },
    life_expectancy: {
        type: Number,
        default: 0
    },
    human_development_index: {
        type: Number,
        default: 0
    },
    new_vaccinations: {
        type: Number,
        default: 0
    },
},
    {
        collection: 'australia_owid_covid_data'
    }
);

module.exports = aus_owid_data
    = mongoose.model("aus_owid_data", aus_owid_data_schema);