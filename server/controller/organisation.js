const db = require('../models/db.js')

const empty_field = {
    success: false,
    message: "All fields must be filled"
}

class Organisation {

    // @route   POST api/civilian/update-org-status
    // @desc    Update the verification status of an org
    // @access  Protected

    async post_update_org_verification_status(req, res){
        try{
            const { email, is_verified } = req.body;

            // check for empty field
            if(!email || typeof is_verified === 'undefined'){
                return res.json(empty_field);
            }
            
            // find the civ by email          
            // and set is healthcare to fase
            db.organisation.findOne({email: email}, (err, org) => {
                if(err)
                    return res.status(500).send({
                        message: err.message
                    })
                if(!org)
                    return res.status(404).json({
                        success: false,
                        message: "Organisation was not found"
                    })
               
                org.verified = is_verified;

                return res.send({
                    success: true,
                    message: "Healthcare organisation's verification status updated",
                    verified: org.verified
                })
                
            })          
        }catch(err){
            res.status(500).send({
                success: false,
                message: err.message
            })
        }
    }

    // @route   POST api/civilian/get-org-by-email-status
    // @desc    Get a verified org by email and verification status
    // @access  Protected

    async get_org_by_email_status(req, res){
        const { email, is_verified } = req.body;

        db.organisation
            .findOne({email: email, verified: is_verified}, (err, user) => {
                if(err)
                    return res.status(500).send({
                        success: false,
                        message: err.message
                    });
                if(!user)
                    return res.status(404).json({
                        success: false,
                        message: "Organisation was not found"
                    });
                
                // return the user's vaccine info
                return res.json({
                    success: true,
                    data: {
                        email: user.email,
                        data: {
                            organisation_name: user.organisation_name,
                            verified: user.verified
                        }
                    }
                });
            })
    }
}

const organisation_controller = new Organisation;
module.exports = organisation_controller;