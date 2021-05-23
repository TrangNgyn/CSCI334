var fs = require('fs')
var test = fs.readFileSync('./random_files/names.txt')
var names = test.toString().split('\r\n')
var email = fs.readFileSync('./random_files/email_prefix.txt')
var test2 = fs.readFileSync('./random_files/password.txt')
var passwords = test2.toString().split('\r\n')

module.exports = {
    names,
    email,
    passwords
}


