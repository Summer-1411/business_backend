const userRepository = require("../repository/UserRepository")
const cartRepository = require("../repository/CartRepository")
const validationUtils = require("../utils/ValidationUtils")
const jwtnUtils = require("../utils/JwtUtils")
const verifyUtils = require("../utils/VerifyUtils")
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
// const otpGenerator = require("otp-generator");
// const { verifyToken } = require("../middleware/verifyToken");
const vi = require("../messages/message_vi")
class AuthService {
    static async getUser(req, res) {
        try {
            const id = 9999;
            const user = await userRepository.getUserById(id)
            console.log('user', user);
            if (validationUtils.isNullOrEmpty(user))
                return res
                    .status(400)
                    .json({ success: false, message: "Không tìm thấy người dùng" });
            return res.json({ success: true });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body
        if (!email || !password)
            return res
                .status(400)
                .json({ success: false, message: 'Thiếu tên người dùng hoặc mật khẩu' })
        try {
            // Check for existing user
            const userExist = await userRepository.getUserByEmail(email)
            if (validationUtils.isNullOrEmpty(userExist)) {
                return res
                    .status(400)
                    .json({ success: false, message: 'Tài khoản không tồn tại !' })
            }
            // Username found
            const passwordValid = await verifyUtils.verifyPassword(userExist.password, password)

            if (!passwordValid) {
                return res
                    .status(400)
                    .json({ success: false, message: 'Mật khẩu không chính xác' })
            }
            const cart = await cartRepository.getCartByUserId(userExist.id);

            // All good
            // Return token
            const { password: userPassword, deleted, ...userResponse } = userExist;
            const accessToken = jwtnUtils.generateAccessToken(
                userExist.id,
                userExist.isAdmin,
                cart.id
            )
            return res.status(200).json({
                success: true,
                message: 'Bạn đã đăng nhập thành công',
                user: userResponse,
                accessToken
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: vi.serverError })
        }
    }
}

module.exports = AuthService;