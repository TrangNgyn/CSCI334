// const express = require('express')
// const router = express.Router();
// const user_controller = require('../controller/user');

// router.get('/get-civs', user_controller.get_all);

// module.exports = router;

const { auth_jwt } = require('../middleware') 
const controller = require('../controller/user')

module.exports = function(app) {
    app.use(function(req,res,next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"  
        )
        next()
    })

    app.get("/api/test/all", controller.allAccess)
    app.get("/api/test/user", [
        auth_jwt.verify_token
    ], controller.userBoard)
    app.get("/api/test/admin", [
        auth_jwt.verify_token,
        auth_jwt.is_admin
    ], controller.adminBoard)
    app.get("/api/test/business", [
        auth_jwt.verify_token,
        auth_jwt.is_business
    ], controller.businessBoard)
}