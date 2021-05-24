const express = require('express')
const router = express.Router();
const { auth_jwt } =  require('../middleware');
const confirmed_cases_locations_controller 
    = require('../controller/stats/confirmed_cases_locations');
const aus_owid_data_controller = require('../controller/stats/aus_owid_data');
const esri_australia_data_controller = require('../controller/stats/esri_australia_data');
const vic_cases_data_controller = require('../controller/stats/vic_confirmed_covid_cases');

// =========== Confirm Cases by Location dataset =========== //

// routes accessible for civilian
router.get('/confirmed-cases-14days',[
    auth_jwt.verify_token,
    auth_jwt.is_civilian
], confirmed_cases_locations_controller.get_cases_14days);

// =========== Australia OWID COVID-19 Data =========== //
router.get('/get-aus-data', [
    auth_jwt.verify_token,
    auth_jwt.is_civilian
], aus_owid_data_controller.get_all_aus_data);

router.get('/get-aus-confirmed-cases-14days', [
    auth_jwt.verify_token,
    auth_jwt.is_civilian
], aus_owid_data_controller.get_aus_confirmed_cases_14days);

router.get('/get-aus-total-vaccinations', [
    auth_jwt.verify_token,
    auth_jwt.is_civilian
], aus_owid_data_controller.get_aus_total_vaccinations);

// =========== esri Australia COVID-19 Data =========== //
router.get('/get-esri-data', [
    auth_jwt.verify_token,
    auth_jwt.is_civilian
], esri_australia_data_controller.get_all_esri_data);

router.get('/get-current-totals-data', [
    auth_jwt.verify_token,
    auth_jwt.is_civilian
], esri_australia_data_controller.get_current_totals);

// =========== VIC confirmed COVID-19 cases Data =========== //
router.get('/get-vic-confirmed-cases-14days', [
    auth_jwt.verify_token,
    auth_jwt.is_civilian
], vic_cases_data_controller.get_vic_confirmed_cases_14days);

module.exports = router