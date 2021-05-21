const business_model = require('../models/users/business');

const empty_field = {
    success: false,
    message: "All fields must be filled"
}

class Business {

    async add_business(req,res) {
        try{
            let { business_name } =  req.body

            const new_bussiness = new business_model({
                business_name,
                //acc_type: "BUSINESS",
                password: "password",
                email: "email",
                //user_id: 1
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

    async get_business(req,res) {
        const { business_id } = req.body;

        if(!business_id)
            return res.status(400).send(empty_field);

        business_model.findOne({business_id})
            .then(result => res.json({
                result,
                success: true
            }))
            .catch((err) => {
                return res.status(500).send({
                    message: err.message
                })
            });
    }
}

const business_controller = new Business
module.exports = business_controller