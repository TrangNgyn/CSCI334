const mongoose = require('mongoose')

const db = {}

db.mongoose = mongoose

db.user = require('./users/user')
db.role = require('./users/role')

db.ROLES = ["user", "admin"]

module.exports =  db
