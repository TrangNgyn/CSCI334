const express = require('express')
const router = express.Router();
const controller = require('../controller/user')
const { auth_jwt } =  require('../middleware')

router.post('/forgot-password', controller.post_forgot_password)
router.post('/change-password', auth_jwt.verify_token, controller.post_reset_password_request)
router.post('/reset-password-email', controller.post_reset_password_email)

router.get('/',auth_jwt.verify_token,controller.get_user_info)

module.exports = router