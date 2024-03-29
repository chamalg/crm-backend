const User = require("../models/UserSchema");

exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            User.findOne({ email }, (error, data) => {
                if (error || !data) {
                    console.log(error);
                    return reject(error);
                }
                return resolve(data);
            });
        } catch (error) {
            return reject(error);
        }
    });
}

exports.storeUserRefreshJWT = (id, token) => {
    return new Promise((resolve, reject) => {
        try {
            User.findOneAndUpdate({ id }, {
                $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() }
            }, { new: true }).then(data => resolve(data)).catch(e => reject(e));
        } catch (error) {
            reject(error);
        }
    })
}