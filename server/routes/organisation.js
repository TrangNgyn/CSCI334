const express = require('express');
const router = express.Router();
const controller = require('../controller/organisation');


router.get('/get_business_details',controller.get_org_buss)

module.exports =  router