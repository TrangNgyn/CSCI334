const db = require('../../models/db');

class EsriAusData {

    async get_all_esri_data(req, res){
        db.esri_aus_data
        .find({})
        .sort({Date: 1})
        .then(docs => {
            if(!docs){
                return res.status(404).send({
                    success: true,
                    message: 'No record found.'
                })
            }

            return res.json({
                success: true,
                esri_data: docs
            })

        })
        .catch(err => res.status(500).send({
            success: false,
            message: 'Error finding any records'
        }))
    }
    
    async get_current_totals(req, res){
        db.esri_aus_data
        .find({})
        .sort({Date: -1})
        .limit(1)
        .then(docs => {
            if(!docs){
                return res.status(404).send({
                    success: true,
                    message: 'No record found.'
                })
            }

            return res.json({
                success: true,
                esri_data: docs
            })

        })
        .catch(err => res.status(500).send({
            success: false,
            message: 'Error finding any records'
        }))
    }

}

const esri_aus_data_controller = new EsriAusData;
module.exports = esri_aus_data_controller;