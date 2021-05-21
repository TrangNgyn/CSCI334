const mongoose = require('mongoose');
const db = require('../models/db');

var empty_field = { 
    success: false,
    message: "All fields must be filled" 
}

class Checkin{

    async post_check_in(req, res){
        let {civilian, business, date} = req.body;

        // check for empty fields
        if(!civilian | !business){
            return res.json(empty_field);
        }

        // create a new instance of check-in
        const new_check = new db.check_in({
            civilian,
            business,
            date: Date.now()
        })

        // save the instance 
        await new_check.save()
            // .then() for testing the doc has been saved and to see its contents
            .then(saved_check_in => {
                console.log(saved_check_in)
            })
        return res.json({
            message: "saved"
        })
    }
}

const checkin_controller = new Checkin;
module.exports = checkin_controller;