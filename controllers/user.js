const User = require("../models/UserSchema");
const { hashPassword, comparePassword } = require("../helpers/bcrypt-helper")
const { getUserByEmail } = require("../helpers/userHelper");
const { createAccessJWT, createRefreshJWT } = require('../helpers/jwtHelper');
const { setPasswordResetPin } = require('./ResetPin')


exports.insert = async (req, res) => {
    const { name, company, address, phone, email, password } = req.body;

    //Hash password
    const hashedPassword = await hashPassword(password);
    const newUser = { name, company, address, phone, email, password: hashedPassword }

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


exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ status: 'Error', message: "Invalid credentials" })
    }

    const user = await getUserByEmail(email);

    const dbPass = user && user._id ? user.password : null;

    if (!dbPass) return res.json({ status: 'Error', message: "Invalid email or password" });

    const result = await comparePassword(password, dbPass);

    if (!result) return res.json({ status: 'Error', message: "Invalid email or password" });

    const accessJWT = await createAccessJWT(user.email, user._id);
    const refreshJWT = await createRefreshJWT(user.email, user._id);

    return res.json({
        status: 'Success',
        message: 'Login success',
        accessJWT,
        refreshJWT
    });
}

exports.getUser = (req, res, next) => {

    return res.json({
        status: 'Success',
        message: 'Login success',
        userId: req.userId
    });
}

exports.resetPassword = async (req, res, next) => {

    const { email } = req.body;
    console.log(email)
    const user = await getUserByEmail(email);

    if (!user || !user._id) {
        return res.json({
            status: 'Error',
            message: 'Reset password failed'
        });
    }

    const setPin = await setPasswordResetPin(email);
    return res.json(setPin);

}