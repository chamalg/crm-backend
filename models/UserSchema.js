const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true
    },
    company: {
        type: String,
        maxLength: 50,
        required: true
    },
    address: {
        type: String,
        maxLength: 50,
        required: true
    },
    phone: {
        type: Number,
        maxLength: 11
    },
    email: {
        type: String,
        maxLength: 50,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 100,
        required: true
    },
    refreshJWT: {
        token: {
            type: String,
            maxLength: 500,
            default: ''
        },
        addedDate: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);