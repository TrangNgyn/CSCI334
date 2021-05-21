const db = require('../models/db')

var empty_field = {
    message: "All fields must be filled and present"
}

class Alert {

    // @route   /api/alert/create-alert
    // @desc    create an 
    // @access  Public currently

    async post_create_alert(req,res) {
        try{
            let { place_id, gps, business_id, virus } = req.body
            if(!place_id | !gps | !business_id)
                return res.status(400).send(empty_field)
            if(!gps.lat | !gps.lng)
                return res.status(400).send({
                    message: "gps requires both lat and long attributes"
                })

            const new_alert = new db.alert({
                place_id,
                gps,
                business_id
            })
            new_alert.save().then(saved_alert => {
                db.check_in.find({ 
                    business: saved_alert.business_id, 
                    date: {$gte: /*saved_alert.date (date doesn't work in the saved doc rn)*/Date.now() - 60 * 60 * 24 * 14 * 1000} // get where the checkin date was >= 2 weeks before the alert
                }).then( check_ins => {
                    // for each found check_in add the alert to the civilian 
                    check_ins.forEach(element => {
                        // find the civ related to the check in and add the alert_id to the civ alerts and save
                        // could be done with findOneAndUpdate but i knew this would work so did it quickly
                        db.civilian.findOne({_id: element.civilian})
                        .then(found_civ => {
                            found_civ.alerts.push(saved_alert._id)
                            found_civ.save()
                        })
                    })
                    // need to return something beter here, not sure what yet
                    return res.json({
                        message: 'An alert has been added and any civilians with possible contact have been alerted'
                    })
                })
                }).catch(err => {
                    return res.status(500).send({
                        message: err.message
                    })
                })
            
            
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    // @route   /api/alerts
    // @desc    gets all alerts
    // @access  Public currently (but who should access this?)

    async get_all_alerts(req,res) {
        try{
            db.alert.find({})
                .then(alerts => {
                    res.send(alerts)
                })
        } catch (err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    // @route   /api/alerts/update
    // @desc    update the alerts in civ arrays?
    // @access  Private?
    
    async put_update_alerts(req,res) {
        
    }

}

const alert = new Alert
module.exports = alert