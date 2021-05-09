// const express = require('express');
// const router = express.Router();
// const business_controller = require('../controller/business')
// const { auth_jwt } = require('../middleware')

// router.get("/api/business/all", [
//     auth_jwt.verify_token,
//     auth_jwt.is_business
// ], business_controller.add_business)

// module.exports = router

const { auth_jwt } = require('../middleware')
const controller = require('../controller/business')

module.exports = function(app) {
    app.use(function(req,res,next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept" 
        )
        next()
    })

    app.get("/api/business/all", [
    auth_jwt.verify_token,
    auth_jwt.is_business
    ], controller.add_business)
}