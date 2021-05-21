const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const check_in_schema = new Schema({
    // checkin_id: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     index: true,
    // },
    business: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'business'
    },
    civilian: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'civilian'
    },
    date: { 
        type: Date, 
        default: Date.now,
    },
},
    {
        collection: 'check_in'
    }
)

// incremental checkin_id
// check_in_schema.pre("save", function(next) {
//     var doc = this;
//     counters.findByIdAndUpdate(
//         {"_id": "checkin_id"},
//         { "$inc": { "seq": 1 }},
//         function(error, counters) {
//             if(error) 
//                 return next(error)
//             doc.po_number = counters.seq.toString();
//             next();
//         }
//     )
// })

module.exports = check_in = mongoose.model("check_in", check_in_schema);