const civilian_model = require('../models/users/civilian')

const empty_field = {
    success: false,
    message: "All fields must be filled"
}

class Civilian{

    async post_add_civ(req,res){
        try{
            let {first_name, last_name} = req.body

            const new_civ = new civilian_model({
                first_name: first_name,
                last_name: last_name,
                acc_type: "CIVILIAN",
                password: "password",
                email: "email2",
                user_id: 2
            })

            var saved_civ = await new_civ.save()
            if(saved_civ) {
                return res.json({
                    success: true
                })
            }
            else {
                return res.jsson({
                    success: false
                })
            }

        }
        catch(err){
            console.log(err)
        }
    }

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
            civilian_model.find({email: email})
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

    
}

const civilians_controller = new Civilian;
module.exports = civilians_controller;