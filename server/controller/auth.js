const config = require('../config/auth_config'),
    db = require('../models/db'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');
    user_controllers = require('./user_controllers')

var salt_rounds = 12;

const empty_field = {
    success: false,
    message: "All fields must be filled"
}

exports.sign_up = (req,res) => {

    try{
    let { email, role } =  req.body

    if(!email | !req.body.password | !role)
        return res.status(400).send(empty_field)

    let found = req.body.password.match(db.passwordRegex)
    if(found == null) {
        return res.status(400).send({
            success: false,
            message: "Password does not meet the criteria"
        })
    }
    let user;
    if(role == "civilian") {
        let { first_name, last_name } = req.body
        if(!first_name | !last_name)
            return res.status(400).send(empty_field)
        user =  new db.civilian({
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: bcrypt.hashSync(req.body.password, salt_rounds),
        }) 
    } 
    
    if(role == "business") {
        let { business_name, qr_code, business_id, address, gps, place_id } = req.body
        if(!business_name | !address | !gps)
            return res.status(400).send(empty_field)
        // if(!address.country|!address.state|!address.city|!address.street|!address.street_num)
        //     return res.status(400).send({
        //         message: "Incorrect address object"
        //     })

        user = new db.business({
            business_name,
            business_id,
            qr_code,
            address,
            place_id,
            gps,
            email,
            password: bcrypt.hashSync(req.body.password,salt_rounds)
        });
    }
        
    if(role == "organisation"){
        let { organisation_name } = req.body
        if(!organisation_name)
            return res.status(400).send(empty_field)
        user = new db.organisation({
            organisation_name,
            email,
            password: bcrypt.hashSync(req.body.password,salt_rounds)
        })
    }

    user.save((err, user) => {

        if(err) {
            console.log(err)
            res.status(500).send({ message: err })
            return
        }
        db.role.findOne({name: req.body.role },(err, roles) => {
            if(err) {
                res.status(500).send({ message: err })
                return;
            }
            user.roles = roles._id
            user.save(err => {
                if(err) {
                    res.status(500).send({ message: err })
                    return
                }
                res.send({ message: "User was registered successfully" })
                return
            })
        })
        
    })
    } catch(err) {
        return res.status(500).send({
            message: err.message
        })
    }

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
            return res.status(404).send({ message: "User not found." })
        

        var password_is_valid = bcrypt.compareSync(req.body.password, user.password)

        if(!password_is_valid) 
            return res.status(401).send({ 
                access_token: null,
                message: "Invalid Password"
            })

        
        var token = jwt.sign({ _id: user._id }, config.secret , { 
            expiresIn: "30m" 
        })
        
        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            if(user.roles[i].name == "organisation" && user.verified == false)
                return res.status(403).send({
                    message: "Account not verified"
                })
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }        
        var token = jwt.sign({ _id: user._id }, config.secret , { 
            expiresIn: "30m" 
        })

        // if there's a better/more readable solution can change, I did this for quick testing of business qr code etc.
        if(authorities[0] === "ROLE_BUSINESS") {
            res.status(200).send({
                success: true,
                access_token: token,
                token_type: "Bearer",
                roles: authorities,
                expires_in: ":1800",
                business_name: user.business_name,
                qr_cde: user.qr_code,
                address: user.address,
            })
        } else {
            res.status(200).send({
                success: true,
                access_token: token,
                token_type: "Bearer",
                roles: authorities,
                expires_in: ":1800"
            })
        }
    })
}


