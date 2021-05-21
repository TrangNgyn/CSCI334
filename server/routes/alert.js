const express = require('express')
const router = express.Router();
const controller = require('../controller/alert.js')
const { auth_jwt } =  require('../middleware')

router.post('/create-alert',controller.post_create_alert)

module.exports = router
