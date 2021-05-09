const mongoose = require('mongoose')

const db = {}

db.mongoose = mongoose

db.user = require('./users/user')
db.business = require('./users/business')
db.civilian = require('./users/civilian')
db.government = require('./users/government')
db.organisation = require('./users/organisation')
db.healthcare = require('./users/healthcare')
db.role = require('./users/role')

db.ROLES = ["user", "admin", "business", "civilian", "government", "healthcare", "organisation"]

module.exports =  db
