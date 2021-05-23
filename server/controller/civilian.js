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

    
}

const civilians_controller = new Civilian;
module.exports = civilians_controller;