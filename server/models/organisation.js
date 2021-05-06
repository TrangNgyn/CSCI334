const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user');

const organisation_schema = user.extend({
    organisation_name: {
        type: String,
        required: true
    },
    employees: {
        type: [Schema.Types.ObjectId],
        default: []
    }
},
{
    collection: "organisation"
})

module.exports = organisation = mongoose.model("organistion", organisation_schema);