const jwt = require("jsonwebtoken");
const { setJwt, getJwt } = require('./redisHelper');
const { storeUserRefreshJWT } = require('../helpers/userHelper');

const createAccessJWT = async (email, id) => {
    try {
        const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET,
            { expiresIn: '15m' });
        await setJwt(accessJWT, `${id}`);
        return Promise.resolve(accessJWT);
    } catch (error) {
        return Promise.reject(error);
    }
}


const createRefreshJWT = async (email, id) => {
    try {
        const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
        await storeUserRefreshJWT(`${id}`, refreshJWT);
        return Promise.resolve(refreshJWT);
    } catch (error) {
        return Promise.reject(error);
    }

}

module.exports = {
    createAccessJWT, createRefreshJWT
}