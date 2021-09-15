const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);


client.on("error", function (error) {
    console.error(error);
});

const setJwt = (key, value) => {
    try {
        return new Promise((resolve, reject) => {
            client.set(key, value, (error, response) => {
                if (error) reject(error);
                resolve(response)
            })
        })
    } catch (error) {
        reject(error);
    }
}

const getJwt = (key) => {
    try {
        return new Promise((resolve, reject) => {
            client.get(key, (error, response) => {
                if (error) reject(error);
                resolve(response)
            })
        })
    } catch (error) {
        reject(error);
    }
}

module.exports = {
    setJwt, getJwt
}