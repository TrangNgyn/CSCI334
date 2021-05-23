const db = require('../models/db.js')

const empty_field = {
    success: false,
    message: "All fields must be filled"
}

class Civilian{

    // @route   GET api/civilian/:email
    // @desc    Get specific civ
    // @access  Protected

    async get_civ_by_email(req, res){
        try{
            let {email} = req.params;

            // check for empty field
            if(!email){
                return res.json(empty_field);
            }
            
            // find the civ by email
            civilian_model.find({email: email})
            .populate('alerts')
            .exec()
            .then((civ) => {
                if (!civ) {
                    res.status(404)
                    return res.json({success: false})
                }
                // this is temp till we figure out what we are doing with the dependents
                var dependents_to_alert = []
                civ.alerts.forEach(element => {
                    db.check_in.find({business: element.business_id })
                    .then(check_in => {
                        check_in.dependant.forEach(element => {
                            dependents_to_alert.push(element)
                        })
                    })
                })
                return res.json({
                    user, 
                    dependents_to_alert
                })
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