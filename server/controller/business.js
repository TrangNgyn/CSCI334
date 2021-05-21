const db = require('../models/db');

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
        db.business.find({})
            .then(result => res.send(result))
    }

    async get_business_by_id(req,res) {
        try{
            const { business_id } = req.body;
            db.business.findOne({ business_id: business_id }, '_id address business_name gps' )
            .then(found => {
                return res.send({
                    found,
                    success: true
                });
            })
        } catch(err) {
            return res.send({
                success: false,
                message: err.message
            });
        }
    }
}

const business_controller = new Business
module.exports = business_controller