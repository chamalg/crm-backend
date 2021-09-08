const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = (password) => {
    return new Promise(resolve => {
        resolve(bcrypt.hashSync(password, saltRounds));    
    });
}