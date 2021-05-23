const db = require('../../models/db');

class AusOWIDData {

    async get_all_aus_data(req, res){
        db.aus_owid_data
        .find({})
        .sort({date: 1})
        .then(docs => {
            if(!docs){
                return res.status(404).send({
                    success: true,
                    message: 'No record found.'
                })
            }

            return res.json({
                success: true,
                aus_data: docs
            })

        })
        .catch(err => res.status(500).send({
            success: false,
            message: 'Error finding any records'
        }))
    }

    async get_aus_total_vaccinations(req, res){
        db.aus_owid_data
        .find({total_vaccinations: {$exists: true, $ne: null}}, 'date total_vaccinations')
        .sort({date: 1})
        .then(docs => {
            if(!docs){
                return res.status(404).send({
                    success: true,
                    message: 'No record found.'
                })
            }

            return res.json({
                success: true,
                total_vaccinations: docs
            })

        })
        .catch(err => res.status(500).send({
            success: false,
            message: 'Error finding any records'
        }))
    }

    async get_aus_confirmed_cases_14days(req, res){
        db.aus_owid_data
        .find({
            date: {
                $gte: Date.now() - 14*24*60*60*1000,
                $lte: Date.now()
            }
        })
        .sort({date: -1})
        .then(docs => {
            if(!docs){
                return res.status(404).send({
                    success: true,
                    message: 'No record found.'
                })
            }

            return res.json({
                success: true,
                aus_14days: docs
            })

        })
        .catch(err => res.status(500).send({
            success: false,
            message: 'Error finding any records'
        }))
    }

}

const aus_owid_data_controller = new AusOWIDData;
module.exports = aus_owid_data_controller;