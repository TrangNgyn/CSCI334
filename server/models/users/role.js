const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const role_schema = new Schema({
    name: String
})

module.exports =  role = mongoose.model('role', role_schema);