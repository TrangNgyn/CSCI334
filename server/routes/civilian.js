const express = require('express');
const router = express.Router();
const civilians_controller = require('../controller/civilian');

// routes for civilians APIs
//router.post('/check-in', civilians_controller.check_in);

router.post('/add-civ', civilians_controller.post_add_civ);

module.exports = router;