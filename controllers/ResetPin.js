const ResetPin = require("../models/ResetPinSchema");
const { randomPinNumber } = require("../utils/randomGenerator");

exports.setPasswordResetPin = async (email) => {

    const pinLength = 6;
    const randomPin = await randomPinNumber(pinLength);
    const resetObj = {
        email,
        pin: randomPin
    }

    return new Promise((resolve, reject) => {
        ResetPin(resetObj)
            .save()
            .then((data) => resolve(data))
            .catch(error => reject(error));
    })
}