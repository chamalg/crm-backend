const User = require("../models/UserSchema");
const { hashPassword, comparePassword } = require("../helpers/bcrypt-helper")
const { getUserByEmail } = require("../helpers/userHelper")


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

    if (!dbPass) return res.json({ status: 'Error', message: "Invalid email or password" })

    const result = await comparePassword(password, dbPass);

    // console.log(result);

    return res.json({ message: 'login success', result })


}