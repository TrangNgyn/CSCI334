const express = require('express');
const router = express.Router();
const civilians_controller = require('../controller/civilians');

// routes for civilians APIs
router.post('/check-in', civilians_controller.check_in);

module.exports = router;