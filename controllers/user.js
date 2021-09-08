const User = require("../models/UserSchema");
const {hashPassword} = require("../helpers/bcrypt-helper")


exports.insert = async (req, res) => {
    const { name, company, address, phone, email, password} = req.body;

    //Hash password
    const hashedPassword = await hashPassword(password);
    const newUser = {name, company, address, phone, email, password: hashedPassword}

    User(newUser)
        .save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(result);
        })
}


exports.insert2 = (user) => {
    return new Promise((resolve, reject) => {
        User(user)
            .save()
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}