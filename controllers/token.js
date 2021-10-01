const { verifyRefreshJWT, createAccessJWT } = require("../helpers/jwtHelper");
const { getUserByEmail } = require("../helpers/userHelper");

exports.newAccessJWT = async (req, res, next) => {

    const { authorization } = req.headers;
    const decoded = await verifyRefreshJWT(authorization);
    if (decoded && decoded.email) {
        const user = await getUserByEmail(decoded.email);
        console.log(user)
        if (user && user._id) {
            let tokenExp = user.refreshJWT.addedDate;
            const dbRefreshToken = user.refreshJWT.token;

            tokenExp = tokenExp.setDate(
                tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY
            );
            const today = new Date();

            if (dbRefreshToken !== authorization && tokenExp < today) {
                console.log("true")
                return res.status(403).json({ message: "Forbidden" });
            }

            const accessJWT = await createAccessJWT(decoded.email, user._id.toString());

            return res.json({ status: 'success', accessJWT })
        }
    }
    res.status(403).json({ message: "Forbidden" })
}