const Bcrypt = require('bcrypt')
const { promisify } = require('util')

/* Maioria das funções do bcrypt trabalham com callbacks, logo, 
é necessário converter para Promises. */
const hashAsync = promisify(Bcrypt.hash)
const compareAsync = promisify(Bcrypt.compare)
const SALT = parseInt(process.env.SALT_PWD)

class PasswordHelper {
    static hashPassword(password) {
        return hashAsync(password, SALT)
    }

    static comparePassword(password, hash) {
        return compareAsync(password, hash)
    }
}

module.exports = PasswordHelper