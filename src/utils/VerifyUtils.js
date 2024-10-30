const argon2 = require("argon2");
class VerifyUtils {
    static verifyPassword(hashedPassword, plainPassword) {
        return argon2.verify(hashedPassword, plainPassword);
    }
    static hashPassword(password) {
        return argon2.hash(password)
    }
}

module.exports = VerifyUtils