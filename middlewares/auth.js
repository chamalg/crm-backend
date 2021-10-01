const { verifyAccessJWT } = require('../helpers/jwtHelper');
const { getUserByEmail } = require('../helpers/userHelper');
const { deleteJwt, getJwt } = require("../helpers/redisHelper");

exports.userAuthorization = async (req, res, next) => {
    const { authorization } = req.headers;

    const decoded = await verifyAccessJWT(authorization);
    if (decoded.email) {
        const userId = await getJwt(authorization);

        if (!userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        req.userId = userId;

        return next();
    }
    deleteJwt(authorization);
    return res.status(403).json({ message: "Forbidden" });
}