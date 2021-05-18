const db = require('../models/db'),
      crypto = require('crypto'),
      hbs = require('nodemailer-express-handlebars'),
      nodemailer = require('nodemailer'),
      email = process.env.MAILER_EMAIL_ID,
      pass = process.env.MAILER_PASSWORD,
      path = require('path'),
      bcrypt = require('bcrypt')

var empty_field = {
    message: "All fields must be filled and present"
}

var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: email,
        pass: pass
    }
})

var salt_rounds = 12

var handlebarsOptions = {
    viewEngine: {
        partialsDir: path.resolve('./', 'views/partials'),
        layoutsDir: path.resolve('./', 'views/layouts')
    },
    extName: '.html',
    viewPath: path.resolve('./','views')
}

smtpTransport.use('compile', hbs(handlebarsOptions))

class User {

    // @route   GET api/user/
    // @desc    get user information
    // @access  Protected Access 

    async get_user_info(req,res) {
        try{
            if(!req.user_id)
                return res.status(403).send({
                    message: "Unauthorized"
                })
            db.user.findById(req.user_id).select("-password -roles -reset_password_token -reset_password_expires -__t -_id -__v").exec((err,user) => {
                if(err)
                    return res.status(500).send({
                        message: err.message
                    })
                if(!user)
                    return res.status(404).send({
                        message: "User was not found"
                    })
                return res.send(user)
            })
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    // @route   POST api/user/forgot-password
    // @desc    user has forgotten password and requests to change it
    // @access  Public Access 
    
    async post_forgot_password(req,res) {
        try{
            db.user.findOne({email: req.body.email}, (err,user) => {
                if(err) 
                    return res.status(500).send({
                        message: err.message
                    })
                if(!user)
                    return res.status(404).send({
                        message: "No user found with that email"
                    })
                crypto.randomBytes(32,(err,buffer)=>{
                    if(err)
                        return res.status(500).send({
                            message: err.message
                        })
                    var myDate = new Date()
                    user.reset_password_token = buffer.toString('hex')
                    user.reset_password_expires = new Date(myDate.getTime() + 86400000)
                    user.save(err => {
                        if(err)
                            return res.status(500).send({
                                message: err.message
                            })
                        var data = {
                            to: user.email,
                            from: email,
                            template: 'forgot-password-email',
                            subject: 'Request to reset password',
                            context: {
                                url: 'http://localhost:3000/user/reset-password-email/token/'+ buffer.toString('hex') + '/email/' + user.email,
                                name: user.first_name
                            }
                        }
                        smtpTransport.sendMail(data,err => {
                            if(err)
                                return res.status(500).send({
                                    message: err.message
                                })
                            return res.send({
                                message: "Kindly check your email for further instructions"
                            })
                        })
                    })
                })
            })
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    // @route   POST api/user/reset-password-email
    // @desc    User has recieved a 
    // @access  Restricted to signed in customers

    async post_reset_password_email(req,res) {
        try{
            if(!req.body.email|!req.body.new_password|!req.body.token)
                return res.status(400).send(empty_field)
            db.user.findOne({ email: req.body.email }, async (err,user) => {
                if(err)
                    return res.status(500).send({
                        message: err.message
                    })
                if(!user)
                    return res.status(404).send({
                        message: "No user found"
                    })
                if(user.reset_password_expires == null | user.reset_password_token == null)
                    return res.status(403).send({
                        message: "Forbidden"
                    })
                if(user.reset_password_expires < Date.now())
                    return res.status(401).send({
                        messsage: "Unauthorized"
                    })
                if(user.reset_password_token !== req.body.token)
                    return res.status(401).send({
                        message: "Unauthorized"
                    })
                const found = req.body.new_password.match(db.passwordRegex)
                if(found == null)
                    return res.status(400).send({
                        message: "Password does not meet the criteria"
                    })
                var new_password_compare = await bcrypt.compare(req.body.new_password,user.password)
                if(new_password_compare)
                    return res.status(400).send({
                        message: "New password cannot be the same as an old password"
                    })
                user.password = bcrypt.hashSync(req.body.new_password, salt_rounds)
                user.reset_password_expires = null
                user.reset_password_token = null
                user.save((err,user)=> {
                    if(err)
                        return res.status(500).send({
                            message: err.message
                        })
                    var data = {
                        to: user.email,
                        from: email,
                        template: 'reset-password-confirmation-email',
                        subject: 'Password reset confirmation',
                        context: {
                            name: user.first_name
                        }
                    }
                    smtpTransport.sendMail(data,err => {
                        if(err)
                            return res.status(500).send({
                                message: err.message
                            })
                        return res.send({
                            message: "Password has been reset, check your email for further confirmation"
                        })
                    })
                })
            })
        } catch(err) {

        }
    }

    //@route    /api/auth/change-password
    //@desc     User requests access while signed in
    //@access   Protected Access

    async post_reset_password_request(req,res) {
        try{
            if(!req.body.new_password|!req.body.verify_password)
                return res.status(400).send(empty_field)
            db.user.findById(req.user_id, async (err,user)=>{
                if(err)
                    return res.status(500).send({
                        messsage: err.message
                    })
                if(!user)
                    return res.status(404).send({
                        message: "User was not found"
                    })
                const found = req.body.new_password.match(db.passwordRegex)
                if(found==null)
                    return res.status(400).send({
                        message: "Password does not match the criteria"
                    })
                var verify_compare = await bcrypt.compare(req.body.verify_password, user.password)
                if(!verify_compare)
                    return res.status(403).send({
                        message: "Verify password was incorrect"
                    })
                var new_password_compare = await bcrypt.compare(req.body.new_password, user.password)
                if(new_password_compare)
                    return res.status(400).send({
                        message: "New password cannot be the same as an old password"
                    })
                user.password = await bcrypt.hash(req.body.new_password,salt_rounds)
                await user.save(err => {
                    if(err)
                        return res.status(500).send({
                            message: err.message
                        })
                    return res.send({
                        message: "Password was reset"
                    })
                })
            })
        } catch(err) {
            console.log(err)
            return res.status(500).send({
                message: err.message
            })
        }
    }
}

const user = new User;
module.exports = user;
