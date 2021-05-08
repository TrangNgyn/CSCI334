const express = require('express');
const router = express.Router();
const business_controller = require('../controller/business')

router.post('/add-bus', business_controller.add_business);
router.get('/',business_controller.get_bus);

module.exports = router