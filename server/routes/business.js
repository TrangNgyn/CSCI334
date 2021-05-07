const express = require('express');
const router = express.Router();
const business_controller = require('../controller/business')

router.post('/add-bus', business_controller.add_business);

module.exports = router