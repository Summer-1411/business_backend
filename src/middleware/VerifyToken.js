const jwt = require("jsonwebtoken");
const jwtUtils = require("../utils/JwtUtils")
const vi = require("../messages/message_vi")
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
        return res
            .status(401)
            .json({ success: false, message: "Access token not found" });

    try {
        const decoded = jwtUtils.verifyToken(token)
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        const id = Number(req.user.id);
        const par = Number(req.params.id);
        console.log(req.user);

        if (id === par || req.user.isAdmin) {
            next();
        } else {
            return res
                .status(403)
                .json({ success: false, message: vi.forbidden });
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ success: false, message: vi.forbidden });
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
};
