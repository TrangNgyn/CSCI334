const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: [{
            firstName: {
            type: String,
            required: true
            },
            otherNames: {
                type: String,
                default: null
            },
            lastName: {
                type: String,
                required: true
            }
        }]   
    },
    certIDs: {
        type: array
    }
})
