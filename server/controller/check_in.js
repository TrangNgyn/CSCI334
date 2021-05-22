const mongoose = require('mongoose');
const db = require('../models/db');

var empty_field = { 
    success: false,
    message: "All fields must be filled" 
}

class Checkin{

    async post_check_in(req, res){
        const {business, dependant} = req.body;
        const user_id = req.user_id; // retrieved from token

        // check for empty fields
        if(!business){
            return res.json(empty_field);
        }

        // dependant needs to be an array, empty or not
        if(!Array.isArray(dependant)){
            return res.json({
                success: false,
                message: '"dependant" must be an array of Strings.'
            })
        }

        // create a new instance of check-in
        const new_check = new db.check_in({
            civilian: user_id,
            business,
            date: Date.now(),
            dependant
        })

        // save the instance 
        await new_check.save()
            // .then() for testing the doc has been saved and to see its contents
            .then(saved_check_in => {

                return res.json({
                    success: true,
                    message: 'User is successfully checked in into the venue',
                    saved_check_in
                })
            })
            .catch(err => res.status(500).send({
                success: false,
                message: err.message
            }))
    }
}

const checkin_controller = new Checkin;
module.exports = checkin_controller;