const civilian_model = require('../models/users/civilian')

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

}

const civilians_controller = new Civilian;
module.exports = civilians_controller;