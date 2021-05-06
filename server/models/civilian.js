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
    }
    // ,
    // cert_ids: {
    //     type: [String],
    //     default: []
    // },
    // infections: {
    //     type: [String],
    //     default: []
    // },
    // alerts: {
    //     type: [Schema.Types.ObjectId],
    //     ref: "alerts",
    //     default: []
    // }
},
{
    collection: 'civilians'
})

civilian_schema.plugin(plug)

module.exports =  civilian = mongoose.model('civilian', civilian_schema);