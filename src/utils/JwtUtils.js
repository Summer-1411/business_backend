const jwt = require("jsonwebtoken");
class JwtUtils {
    static generateAccessToken(userId, isAdmin, idCart) {
        return jwt.sign(
            { id: userId, isAdmin, idCart },
            process.env.ACCESS_TOKEN_SECRET
        );
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
}

module.exports = JwtUtils