const express = require('express');
const router = express.Router();
const civilians_controller = require('../controller/civilian');

// router.post('/add-civ', civilians_controller.post_add_civ);
router.get('/:email', civilians_controller.get_civ_by_email);


module.exports = router;