const { verify_sign_up } = require("../middleware")
const controller = require('../controller/auth')
const express = require('express')
const router = express.Router()

router.post('/sign_up',
    [
        verify_sign_up.check_Duplicate_Email,
        verify_sign_up.check_Roles_Existed
    ],controller.sign_up)
router.post('/sign_in',controller.sign_in)

module.exports = router
