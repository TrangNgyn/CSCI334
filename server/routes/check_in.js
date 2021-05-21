const express = require('express'),
    router = express.Router(),
    controller = require('../controller/check_in'),
    { auth_jwt } = require('../middleware');

// routes accessible by civilian
router.post('/create-check-in', [
    auth_jwt.verify_token,
    auth_jwt.is_civilian
], controller.post_check_in)

module.exports = router