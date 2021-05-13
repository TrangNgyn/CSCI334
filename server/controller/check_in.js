const mongoose = require('mongoose');
const checkin_model = require('../models/check_in');

var empty_field = { 
    success: false,
    message: "All fields must be filled" 
}

class Checkin{

    async post_check_in(req, res){
        let {civilian, business, date} = req.body;

        // check for empty fields
        if(!civilian | !business | !date){
            return res.json(empty_field);
        }

        // create a new instance of check-in
    }
}

const checkin_controller = new Checkin;
module.exports = checkin_controller;