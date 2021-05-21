const express = require('express');
const router = express.Router();
const controller = require('../controller/business')
const { auth_jwt } = require('../middleware')

// module.exports = function(app) {
//     app.use(function(req,res,next) {
//         res.header(
//             "Access-Control-Allow-Headers",
//             "x-access-token, Origin, Content-Type, Accept" 
//         )
//         next()
//     })

//     app.get("/api/business/all", [
//     auth_jwt.verify_token,
//     auth_jwt.is_business
//     ], controller.add_business)
// }

router.get('/all',controller.get_bus) 
router.get('/',
[
    auth_jwt.verify_token,
    auth_jwt.is_civilian
], controller.get_specific_bus)

module.exports = router