const { verifyAccessJWT } = require('../helpers/jwtHelper');
const { getJwt } = require('../helpers/redisHelper');

exports.userAuthorization = async (req, res, next) => {
    const { authorization } = req.headers;

    const decoded = await verifyAccessJWT(authorization);
    console.log(decoded);
    if (decoded.email) {
        const userId = await getJwt(authorization);
        console.log(userId);

        if (!userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        req.userId = userId;

        return next();
    }
    return res.status(403).json({ message: "Forbidden" });
}