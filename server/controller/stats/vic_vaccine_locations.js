const db = require('../../models/db');

class VicVaccineLocations {

    // get all confirmed cases within the last 2 weeks (in milisecs)
    async get_vic_vaccine_locations(req, res){
        db.vic_vaccine_locations_data
            .find({})
            .then(docs => {
                if(!docs){
                    return res.status(404).send({
                        success: true,
                        message: 'No vaccine locations found.'
                    })
                }

                return res.json({
                    success: true,
                    vaccine_locations: docs
                })

            })
            .catch(err => res.status(500).send({
                success: false,
                message: 'Error finding vaccine locations'
            }))
    }

}

const vic_vaccine_locations_controller = new VicVaccineLocations;
module.exports = vic_vaccine_locations_controller;