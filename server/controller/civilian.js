const civilian_model = require('../models/civilian')

class Civilian{

    async post_add_civ(req,res){
        try{
            let {first_name, last_name} = req.body

            var name = [{
                first_name: first_name, 
                last_name: last_name
            }]

            const new_civ = new civilian_model({
                user_id: 4,
                name: name
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


    // @route   POST civilians/check-in
    // @desc    Check in a civilian
    // @access  Public
    // async check_in(req, res){
    //     console.log("Check in a civilian");

    //     res.send({message: "Civilian checked in successfully!"});
    // }

}

const civilians_controller = new Civilian;
module.exports = civilians_controller;