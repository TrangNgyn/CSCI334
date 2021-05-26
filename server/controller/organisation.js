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
            // and set is healthcare to false
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
                
                org.save(err => {
                    if(err)
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    
                    return res.send({
                        success: true,
                        message: "Healthcare organisation's verification status succesfully updated.",
                        verified: org.verified
                    });
                })              
                
            })          
        }catch(err){
            res.status(500).send({
                success: false,
                message: err.message
            });
        }
    }
    
    async manual_alert(req,res) {
        try{
            
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    // @route   POST api/civilian/get-org-by-email-status
    // @desc    Get a verified org by email and verification status
    // @access  Protected

    async get_org_by_status(req, res){
        // const { is_verified } = req.body;

        // check for empty field
        // if(typeof is_verified === 'undefined'){
        //     return res.json(empty_field);
        // }

        let verified_org, unverified_org;
        
        try{
            // find verified orgs
            await db.organisation
                .find({verified: true}, (err, user) => {
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
                    
                    verified_org = user.map(org => {
                        return {
                            organisation_name: org.organisation_name,
                            email: org.email
                        }                        
                    })
                })

            // find unverified orgs
            await db.organisation
                .find({verified: false}, (err, user) => {
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
                    
                    unverified_org = user.map(org => {
                        return {
                            organisation_name: org.organisation_name,
                            email: org.email
                        }                        
                    })

                    return res.json({
                        success: true,
                        data: {
                            verified_org,
                            unverified_org
                        }
                    });
                })

        }catch(err){
            res.status(500).send(err)
        }
        
    }

    async get_org_buss(req,res) {
        try{
            // find all businesses and send back business_name and addresss to the FE for the 
            // org user to search for the desired user
            await db.business.find({}).select("business_name address")
            .then(found => {
                return res.send(found)
            })
            
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }
}

const organisation_controller = new Organisation;
module.exports = organisation_controller;