const express = require('express');
const router = express.Router();
const civilians_controller = require('../controller/civilian');
const civilian = require('../models/users/civilian');

// router.post('/add-civ', civilians_controller.post_add_civ);
router.get('/:email', civilians_controller.get_civ_by_email);


router.post('/search-civilian', [
    auth_jwt.verify_token,
    auth_jwt.is_healthcare,
], civilians_controller.post_search_civilian);

module.exports = router;