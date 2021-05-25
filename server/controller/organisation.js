const db = require('../models/db.js')

const empty_field = {
    success: false,
    message: "All fields must be filled"
}

class Organisation {

    async manual_alert(req,res) {
        try{
            
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }



    async get_org_buss(req,res) {
        try{
            // find all businesses and send back business_name and addresss to the FE for the 
            // org user to search for the desired user
            await db.business.find({}).select("business_name address")
            .then(found => {
                return res.send(found)
            })
            
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }
}

const organisation_controller = new Organisation;
module.exports = organisation_controller;