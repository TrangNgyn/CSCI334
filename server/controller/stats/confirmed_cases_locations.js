const db = require('../../models/db');

class ConfirmedCasesLocations {

    // get all confirmed cases within the last 2 weeks (in milisecs)
    async get_cases_14days(req, res){
        db.confirmed_cases_locations            
            .find({
                notification_date: {
                    $gte: Date.now() - 14*24*60*60*1000,
                    $lte: Date.now()
                }
            })
            .sort({notification_date: -1})
            .then(docs => {
                if(!docs){
                    return res.status(404).send({
                        success: true,
                        message: 'No confirmed cases found.'
                    })
                }

                return res.json({
                    success: true,
                    confirmed_cases: docs
                })

            })
            .catch(err => res.status(500).send({
                success: false,
                message: 'Error finding confirmed cases within 2 weeks'
            }))
    }

    // get all confirmed cases by region
    async get_cases_by_region(req, res){
        
    }

}

const confirmed_cases_locations_controller = new ConfirmedCasesLocations;
module.exports = confirmed_cases_locations_controller;