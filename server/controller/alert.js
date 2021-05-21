const db = require('../models/db')

var empty_field = {
    message: "All fields must be filled and present"
}

class Alert {

    async post_create_alert(req,res) {
        try{
            let { place_id, gps, business_id, virus } = req.body
            if(!place_id | !gps | !business_id)
                return res.status(400).send(empty_field)
            if(!gps.lat | !gps.lng)
                return res.status(400).send({
                    message: "gps requires both lat and long attributes"
                })
            new db.alert({
                place_id,
                gps,
                business_id
            }).save((err,save) =>{
                if(err)
                    return res.status(500).send({
                        message: err.message
                    })
                return res.send({
                    message: "new alert was created and added to the db"
                })
            })
            
            
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

}

const alert = new Alert
module.exports = alert