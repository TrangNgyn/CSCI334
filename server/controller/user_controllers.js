const user_controllers = {}
user_controllers.business =  require('./business')
user_controllers.healthcare_organisation = require('./organisation')
user_controllers.civilian = require('./civilian')

module.exports = db