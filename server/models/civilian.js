const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plug = require('./plugin')

const civilian_schema =  new Schema({
    name: {
        type: [{
            first_name: {
                type: String,
                required: true
            },
            last_name: {
                type: String,
                required: true
            }
        }]
    },
    cert_ids: {
        type: [String],
        default: []
    },
    infections: {
        type: [String],
        default: []
    },
    alerts: {
        type: [Schema.Types.ObjectId],
        ref: "alerts",
        default: []
    },

    // for finding the places an infected person has been to
    checked_in_places: {
        type: [Schema.Types.ObjectId],
        default: [],
    }
},
{
    collection: 'civilian'
})

civilian_schema.plugin(plug)

module.exprots =  civilian = mongoose.model('civilian', civilian_schema);