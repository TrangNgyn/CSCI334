const { verify_sign_up } = require("../middleware")
const controller = require('../controller/auth')

module.exports =  function(app) {
    app.use(function (req,res,next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.post("/api/auth/sign_up", 
    [
        verify_sign_up.check_Duplicate_Email,
        verify_sign_up.check_Roles_Existed
    ],controller.sign_up)

    app.post("/api/auth/sign_in", controller.sign_in)
}