const business_model = require('../models/users/business')

class Business {

    async add_business(req,res) {
        try{
            let { business_name } =  req.body

            const new_bussiness = new business_model({
                business_name,
                acc_type: "BUSINESS",
                password: "password",
                email: "email",
                user_id: 1
            })

            var saved_bus = await new_bussiness.save()
            if(saved_bus){
                return res.json({
                    success: true
                })
            }
            else{
                return res.json({
                    sucess: false
                })
            }
        }
        catch(err) {
            console.log(err)
        }
    }
}

const business_controller = new Business
module.exports = business_controller