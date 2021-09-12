const User = require("../models/UserSchema");

exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
        User.findOne({ email }, (error, data) => {
            if (error || !data) {
                console.log(error);
                reject(error);
            }
            resolve(data);
        });
    } catch(error){
        reject(error);
    }
    });
}