const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    user_id: {
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
    acc_type: {
        type: String,
        required: true,
        enum: ['CIVILIANS', 'HEALTHCARE_PROFESSIONAL', 'GOVERNMENT', 'BUSINESS','ORGANISATION']
    }
},
    {
        collection: 'users'
    }
)

module.exports = user = mongoose.model("user", user_schema);
