const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetPinSchema = new Schema({
    pin: {
        type: String,
        maxLength: 6,
        minLength: 6
    },
    email: {
        type: String,
        maxLength: 50,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("ResetPin", ResetPinSchema);