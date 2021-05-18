const { verify_sign_up, auth_jwt } = require("../middleware")
const controller = require('../controller/auth')
const express = require('express')
const router = express.Router()

// sign up and sign in routes
router.post('/sign_up',
    [
        verify_sign_up.check_Duplicate_Email,
        verify_sign_up.check_Roles_Existed
    ],controller.sign_up)
router.post('/sign_in',controller.sign_in)

// verification routes
router.get('/is_admin',[auth_jwt.verify_token,auth_jwt.is_admin], (req,res) => {
    return res.send({
        admin: true
    })
})
router.get('/is_business',[auth_jwt.verify_token,auth_jwt.is_business], (req,res) => {
    return res.send({
        business: true
    })
})
router.get('/is_healthcare',[auth_jwt.verify_token,auth_jwt.is_healthcare], (req,res) => {
    return res.send({
        healthcare: true
    })
})
router.get('/is_organisation',[auth_jwt.verify_token,auth_jwt.is_organisation], (req,res) => {
    return res.send({
        organisation: true
    })
})

router.get('/is_civilian', [auth_jwt.verify_token,auth_jwt.is_civilian], (req,res) => {
    return res.send({
        civilian: true
    })
})

module.exports = router
