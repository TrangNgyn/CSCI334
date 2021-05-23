var data = require('./load_data')
var bcrypt = require('bcrypt');
var db = require('../models/db')
var fs = require('fs')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const crypto = require('crypto')
const QRCode = require('qrcode')

var salt_rounds = 12;
var seperator = "-"
var buss = []
var save_bus = []

db.mongoose.connect(process.env.MONGODB_STRING, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

function random_int(max) {
    return Math.floor(Math.random() * max)
}

function random_float(value){
    return (Math.random() + value).toFixed(5)
}

async function generate_QR(business_id) {
    try {
      const qr_code_url = await QRCode.toDataURL(business_id);
      return qr_code_url
    } catch (err) {
      console.error(err)
    }
}
function create_hash(email) {
    const hash = crypto.createHash('sha256')
    hash.update(email)
    return hash.digest('hex')
}

async function generate() {

    var bus_id
    await db.role.findOne({name: 'business'})
    .then(role => {
        bus_id = role._id
    })

    for(let i = 0; i< 400; i++) {
        var password = data.passwords[random_int(100)]
        var first_name = data.names[random_int(2000)]
        var last_name = data.names[random_int(2000)]
        var business_name =  first_name + seperator + last_name
        var email = first_name + seperator + last_name + "@" + data.email
        var roles = [bus_id] 
        var business_id = create_hash(email)
        var qr_code = await generate_QR(business_id)
        var address =  data.passwords[random_int(100)] + ' ' + data.names[random_int(2000)]
        var lat = random_float(-35)
        var lng = random_float(151)
        var gps = {
            lat: lat,
            lng: lng
        }
        buss.push({
            email: email,
            password: password
        })

        const bus = new db.business({
            email,
            password:  bcrypt.hashSync(password, salt_rounds),
            business_id,
            qr_code,
            address,
            gps,
            roles,
            business_name
        })

        save_bus.push(bus)

    }
}

async function finish() {
    console.time('Execution Time')
    await generate()
    await db.business.insertMany(save_bus)
    buss.forEach(element => {
        fs.appendFileSync('./bus-logins', 'email:\t\t' + element.email + '\n'
            + 'password:\t' + element.password + '\n----------\n')
    })
    console.timeEnd('Execution Time')
    db.mongoose.connection.close()
}

finish()

