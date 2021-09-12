const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = (password) => {
    return new Promise(resolve => {
        resolve(bcrypt.hashSync(password, saltRounds));
    });
}


exports.comparePassword = (plainText, dbHash) => {
    console.log("Plain text - ", plainText)
    console.log("dbHash - ", dbHash)

    return new Promise((resolve, reject) => {
        try {
            bcrypt.compare(plainText, dbHash, function (error, result) {
                if (error) {
                    reject(error);
                }

                console.log("result - ", result)
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }

    });


}