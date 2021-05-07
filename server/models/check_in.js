const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const check_in_schema = new Schema({
    check_in_id: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    business: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    civilian: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    date: { 
        type: Date, 
        default: Date.now,
    },
},
    {
        collection: 'check_in'
    }
)

module.exports = check_in = mongoose.model("check_in", check_in_schema);