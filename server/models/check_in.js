const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const check_in_schema = new Schema({
    business: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'business'
    },
    civilian: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'civilian'
    },
    date: { 
        type: Date, 
        default: Date.now(),
    },
    dependant: {
        type: [String],
        default: [],
        required: false,
    }
},
    {
        collection: 'check_in'
    }
)

module.exports = check_in = mongoose.model("check_in", check_in_schema);