const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required:true
    },
    bookings: [
        {
            date:{
                type: String
            },
            advisor:{
                type: Schema.Types.ObjectId,
                ref: 'Advisor'
            }
        }
    ]
})

module.exports = mongoose.model('User', userSchema);