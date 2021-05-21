const mongoose = require('mongoose')

const db = {}

db.mongoose = mongoose

// user models
db.user = require('./users/user')
db.business = require('./users/business')
db.civilian = require('./users/civilian')
db.organisation = require('./users/healthcare_organisation')
db.role = require('./users/role')
db.admin = require('./users/admin')

// other models
db.alert = require('./alerts')
db.check_in = require('./check_in')
db.counters = require('./counters')


db.passwordRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
db.ROLES = ["business", "civilian", "healthcare", "organisation", "admin"]
db.COUNTERS = ["alert_id"]

module.exports =  db
