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
    db.admin.findById(req.user_id).exec((err,user) => {
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

is_business = (req,res,next) => {
    db.business.findById(req.user_id).exec((err, user) => {
        if(err){
            res.status(500).send({ message: err })
            return
        }
        db.role.find({
            _id: { $in: user.roles }
        }, (err, roles) => {
            if(err) {
                res.status(500).send({ message: err })
            }
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "business") {
                    next();
                    return
                }
            }
            res.status(403).send({ message: "Require Business Role" })
            return
        })
    })
}

is_healthcare = (req, res, next ) => {
    db.civilian.findById(req.user_id).exec((err,user) => {
        if(err)
            return res.status(500).send({
                message: err.message
            })
        db.role.find({
            _id: {$in: user.roles }
        }, (err,roles) => {
            if(err)
                return res.status(500).send({
                    message: err.message
                })
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "healthcare")
                    return next()
            }
            res.setHeader("WWW-Authenticate")
            res.status(403).send({
                message: "Require Business Role"
            })
        })
    })
}

const auth_jwt = {
    verify_token,
    is_admin,
    is_business
}

module.exports = auth_jwt