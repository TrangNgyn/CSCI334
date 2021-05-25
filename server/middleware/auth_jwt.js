const  jwt = require('jsonwebtoken'),
    config = require('../config/auth_config'),
    db = require('../models/db')

verify_token = (req,res, next) => {
    let auth_header = req.headers.authorization
    let token

    if(!auth_header){
        res.setHeader("WWW-Authenticate","Bearer")
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    else 
        token = auth_header.split(' ')[1]
        
        jwt.verify(token,config.secret,(err,decoded) => {
            if(err) {
                res.status(401)
                if(err.message=="jwt expired") {
                    res.setHeader("WWW-Authenticate","Bearer error='invalid_token',error_description='The access token has expired'")
                    return res.send({
                        success: false,
                        message: "Unauthorized"
                    })
                }
                if(err.message=='invalid token'){
                    res.setHeader("WWW-Authenticate","Bearer error='invalid_token',error_description='The access token failed verification'")
                    return res.send({
                        success: false,
                        message: "Unauthorized"
                    })
                }
                if(err.message=='jwt malformed'){
                    res.setHeader("WWW-Authenticate","Bearer error='jwt malformed',error_description='The access token was malformed'")
                    return res.send({
                        success: false,
                        message: "Unauthorized"
                    })
                }
                res.setHeader("WWW-Authenticate","Bearer error='invalid_token',error_description='Unexpected validation error'")
                return res.send({
                    success: false,
                    message: "Unauthorized"
                })
                    
            }
            req.user_id =  decoded._id
            next()
        })
}

is_admin = (req,res,next) => {
    db.admin.findById(req.user_id).exec((err,user) => {
        if(err)
            return res.status(500).send({
                message: err
            })
        if(!user) 
            return res.status(404).send({
                message: "No user found, Unauthorized"
            })
        db.role.find({
            _id: {$in: user.roles }
        },(err, roles) => {
            if(err)
                return res.status(500).send({
                    message: err
                })
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "admin"){
                    return next()
                }
            }
            res.setHeader("WWW-Authenticate","Bearer realm='is_admin',error='insufficient_scope',error_description='Access token not valid for this resource'")
            res.status(403).send({
                message: "Require Admin Role, unauthorized"
            })
        })
    })
}

is_business = (req,res,next) => {
    db.business.findById(req.user_id).exec((err,user) => {
        if(err)
            return res.status(500).send({
                message: err
            })
        if(!user) 
            return res.status(404).send({
                message: "No user found, Unauthorized"
            })
        db.role.find({
            _id: {$in: user.roles }
        },(err, roles) => {
            if(err)
                return res.status(500).send({
                    message: err
                })
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "business"){
                    return next()
                }
            }
            res.setHeader("WWW-Authenticate","Bearer realm='is_business',error='insufficient_scope',error_description='Access token not valid for this resource'")
            res.status(403).send({
                message: "Require Business Role, unauthorized"
            })
        })
    })
}

is_healthcare = (req,res,next) => {
    db.civilian.findById(req.user_id).exec((err,user) => {
        if(err)
            return res.status(500).send({
                message: err
            })
        if(!user) 
            return res.status(404).send({
                message: "No user found, Unauthorized"
            })
        db.role.find({
            _id: {$in: user.roles }
        },(err, roles) => {
            if(err)
                return res.status(500).send({
                    message: err
                })
            for(let i = 0; i < roles.length; i++) {
                console.log(roles[i].name)
                if(roles[i].name === "healthcare"){
                    return next()
                }
            }
            res.setHeader("WWW-Authenticate","Bearer realm='is_healthcare',error='insufficient_scope',error_description='Access token not valid for this resource'")
            res.status(403).send({
                message: "Require Healthcare Role, unauthorized"
            })
        })
    })
}

is_civilian = (req,res,next) => {
    db.civilian.findById(req.user_id).exec((err,user) => {
        if(err)
            return res.status(500).send({
                message: err
            })
        if(!user) 
            return res.status(404).send({
                message: "No user found, Unauthorized"
            })
        db.role.find({
            _id: {$in: user.roles }
        },(err, roles) => {
            if(err)
                return res.status(500).send({
                    message: err
                })
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "civilian" || roles[i].name === "healthcare"){
                    return next()
                }
            }
            res.setHeader("WWW-Authenticate","Bearer realm='is_civilian',error='insufficient_scope',error_description='Access token not valid for this resource'")
            res.status(403).send({
                message: "Require Civilian Role, unauthorized"
            })
        })
    })
}

is_organisation = (req,res,next) => {
    db.organisation.findById(req.user_id).exec((err,user) => {
        if(err)
            return res.status(500).send({
                message: err
            })
        if(!user) 
            return res.status(404).send({
                message: "No user found, Unauthorized"
            })
        db.role.find({
            _id: {$in: user.roles }
        },(err, roles) => {
            if(err)
                return res.status(500).send({
                    message: err
                })
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "organisation"){
                    return next()
                }
            }
            res.setHeader("WWW-Authenticate","Bearer realm='is_organisation',error='insufficient_scope',error_description='Access token not valid for this resource'")
            res.status(403).send({
                message: "Require Organisation Role, unauthorized"
            })
        })
    })
}

const auth_jwt = {
    verify_token,
    is_admin,
    is_business,
    is_civilian,
    is_healthcare,
    is_organisation
}

module.exports = auth_jwt