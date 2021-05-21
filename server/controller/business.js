const db = require('../models/db')

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

    async get_bus(req,res) {
        business_model.find({})
            .then(result => res.send(result))
    }

    async get_specific_bus(req,res) {
        try{
            db.business.find({ _id: req.query.business_id })
            .then(found => {
                return res.send(found)
            })
        } catch(err) {
            return res.send({
                message: err.message
            })
        }
    }
}

const business_controller = new Business
module.exports = business_controller