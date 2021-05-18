const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const base_options = {
    discriminator_key: 'user_type',
    collection: 'users'
}

const user_schema = new Schema({
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
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: "role"
        }
    ],
    reset_password_token: {
        type: String,
        default: null
    },
    reset_password_expires: {
        type: Date,
        default: null
    }

}, base_options )

module.exports = user = mongoose.model('user', user_schema);
