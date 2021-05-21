const express = require('express')
const router = express.Router();
const { auth_jwt } =  require('../middleware');
const confirmed_cases_locations_controller 
    = require('../controller/stats/confirmed_cases_locations');
const aus_owid_data_controller = require('../controller/stats/aus_owid_data');

// =========== Confirm Cases by Location dataset =========== //

// routes accessible for civilian
router.get('/confirmed-cases-14days',[
    auth_jwt.verify_token,
    auth_jwt.is_civilian
], confirmed_cases_locations_controller.get_cases_14days)

// =========== Australia OWID COVID-19 Data =========== //

module.exports = router