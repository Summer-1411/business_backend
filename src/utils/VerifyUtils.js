const argon2 = require("argon2");
class VerifyUtils {
    static async verifyPassword(hashedPassword, plainPassword) {
        return argon2.verify(hashedPassword, plainPassword);
    }
}

module.exports = VerifyUtils