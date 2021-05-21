const express = require('express'),
    router = express.Router(),
    controller = require('../controller/check_in')


router.post('/create-check-in', controller.post_check_in)

module.exports = router