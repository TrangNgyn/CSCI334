const db = require('../models/db.js')

const empty_field = {
    success: false,
    message: "All fields must be filled"
}

class Civilian{

    // @route   POST api/civilian/civilian-by-email
    // @desc    Get all civilians sorted by email
    // @access  Protected

    async post_civ_by_email(req, res){
        try{
            let {email} = req.body;

            // check for empty field
            if(!email){
                return res.json(empty_field);
            }
            
            // find the civ by email
            db.civilian.find({email: email})
            .exec()
            .then((civ) => {
                if (!civ) {
                    res.status(404)
                    return res.json({success: false})
                }
                return res.json(user)
            })
            .catch(err => res.json(err))

        }catch(err){
            console.log(err)
        }
    }

    // @route   POST api/civilian/search-civilian
    // @desc    Find a civilian with a specific email
    // @access  Protected

    async post_search_civilian(req,res){
        const {email} = req.body;

        db.civilian
            .find({
                email: email
            })
            .then(doc => {
                if(!doc){
                    return res.status(404).send({
                        success: true,
                        message: 'No civilian found.'
                    })
                }

                return res.json({
                    success: true,
                    civilian: doc
                })

            })
            .catch(err => res.status(500).send({
                success: false,
                message: `Error finding the civilian with email ${email}`
            }))
    }
    
}

const civilians_controller = new Civilian;
module.exports = civilians_controller;