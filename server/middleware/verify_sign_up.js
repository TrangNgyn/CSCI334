const db = require('../models/db')

check_Duplicate_Email = (req,res,next) => {
    // check email duplicate
    db.user.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err })
            return
        }
        if(user) {
            res.status(400).send({ message:  "Failed! Email already in use." })
            return
        }
        next() 
    })
}

check_Roles_Existed = (req,res,next) => {
    if(req.body.roles) {
        for(let i = 0; i < req.body.roles.length; i++) {
            if(!db.ROLES.includes(req.body.roles[i])) {
                res.status(400),send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist.`
                })
                return
            }
        }
    }
    next()
}

const verify_sign_up = {
    check_Duplicate_Email,
    check_Roles_Existed
}

module.exports = verify_sign_up