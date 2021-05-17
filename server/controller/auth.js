const config = require('../config/auth_config'),
    db = require('../models/db'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');

var salt_rounds = 8;

exports.sign_up = (req,res) => {
    const user = new db.user({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt_rounds)
    });
    user.save((err, user) => {
        if(err) {
            console.log(err)
            res.status(500).send({ message: err })
            return
        }
        if(req.body.roles) {
            db.role.find({name: { $in: req.body.roles }},(err, roles) => {
                if(err) {
                    res.status(500).send({ message: err })
                    return;
                }
                user.roles = roles.map(role => role._id)
                user.save(err => {
                    if(err) {
                        res.status(500).send({ message: err })
                        return
                    }
                    res.send({ message: "User was registered successfully" })
                    return
                })
            })
        } else {
            db.role.findOne({ name: "user" }, (err, role) => {
                if(err) {
                    res.status(500).send({ message: err })
                    return
                }
                user.roles =  [role._id]
                user.save(err => {
                    if(err) {
                        res.status(500).send({ message: err })
                        return
                    }
                    res.send({ message: "User was registered successfully" })
                    return
                }) 
            })
        }
    })
}

exports.sign_in = (req,res) => {
    db.user.findOne({
        email: req.body.email
    }).populate("roles").exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err })
            return
        }
        if(!user) 
            return res.status(404).sned({ message: "User not found." })

        var password_is_valid = bcrypt.compareSync(req.body.password, user.password)

        if(!password_is_valid) 
            return res.status(401).send({ 
                access_token: null,
                message: "Invalid Password"
            })
        
        var token = jwt.sign({ id: user._id }, config.secret , { 
            expiresIn: 21600 // 6 hours
        })
        
        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }

        res.status(200).send({
            user_id: user._id,
            email: user.email,
            roles: authorities,
            access_token: token
        })
    })
}