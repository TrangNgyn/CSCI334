const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const base_options = {
    discriminator_key: 'user_type',
    collection: 'users'
}

const user_schema = new Schema({
    // user_id: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     index: true
    // },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        index: true
    },
    // acc_type: {
    //     type: String,
    //     required: true,
    //     enum: ['CIVILIAN', 'HEALTHCARE_PROFESSIONAL', 'GOVERNMENT', 'BUSINESS','ORGANISATION']
    // },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: "role"
        }
    ]
}, base_options )

module.exports = user = mongoose.model('user', user_schema);