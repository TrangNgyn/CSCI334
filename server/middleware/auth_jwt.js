const  jwt = require('jsonwebtoken'),
    config = require('../config/auth_config'),
    db = require('../models/db')

verify_token = (req,res, next) => {
    let token = req.headers["x-access-token"]

    if(!token) 
        return res.status(403).send({ message: "No token provided" })
    
    
    jwt.verify(token, config.secret, (err,decoded) => {
        if(err) 
            return res.status(401).send({ message: "Unauthorized" })
        req.user_id = decoded.id
        next()
    })
}

is_admin =  (req,res,next) => {
    db.user.findById(req.user_id).exec((err,user) => {
        if(err){
            res.status(500).send({ message: err })
            return
        }
        db.role.find({
            _id: { $in: user.roles }
            },
            (err, roles) => {
                if(err) {
                    res.status(500).send({ message: err })
                }
                for (let i = 0; i < roles.length; i++) {
                    if(roles[i].name === "admin") {
                        next();
                        return
                    }
                }
                res.status(403).send({ message: "Require Admin Role" })
                return
            }
        )
    })
}

const auth_jwt = {
    verify_token,
    is_admin
}

module.exports = auth_jwt