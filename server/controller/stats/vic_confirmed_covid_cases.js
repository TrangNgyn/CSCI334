const db = require('../../models/db');

class VicConfirmedCasesLocations {

    // get all confirmed cases within the last 2 weeks (in milisecs)
    async get_vic_confirmed_cases_14days(req, res){
        db.vic_confirmed_covid_locations_data
            .find({
                diagnosis_date: {
                    $gte: Date.now() - 14*24*60*60*1000,
                    $lte: Date.now()
                }
            })
            .sort({diagnosis_date: -1})
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

}

const vic_confirmed_cases_locations_controller = new VicConfirmedCasesLocations;
module.exports = vic_confirmed_cases_locations_controller;