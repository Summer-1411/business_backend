const userRepository = require("../repository/UserRepository")
const cartRepository = require("../repository/CartRepository")
const otpRepository = require("../repository/OtpRepository")
const validationUtils = require("../utils/ValidationUtils")
const jwtnUtils = require("../utils/JwtUtils")
const verifyUtils = require("../utils/VerifyUtils")
const emailService = require("./EmailService")
const vi = require("../messages/message_vi")
const { TYPE_SEND_OTP } = require("../constant")
const { validExpiresTime } = require("../utils/TimeUtils")
class AuthService {
    static async getUser(req, res) {
        try {
            const id = req.user.id;
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

    static async register(req, res) {
        const { email, password, username, otp } = req.body
        if (!email || !password || !username || !otp) {
            return res
                .status(400)
                .json({ success: false, message: 'Vui lòng nhập đủ thông tin !' })
        }
        try {
            const valueOTP = await otpRepository.getOtpByOtpCode(otp)
            if (valueOTP?.email !== email) {
                return res.status(400).json({ success: true, message: "Mã OTP không hợp lệ với email này !" })
            }
            if (validationUtils.isNullOrEmpty(valueOTP)) {
                return res.status(500).json({ success: false, message: "Mã OTP không hợp lệ !" })
            }
            let checkTimeExpires = validExpiresTime(valueOTP?.createAt)
            if (checkTimeExpires) {
                const hashedPassword = await verifyUtils.hashPassword(password)
                const dataUserSave = {
                    email,
                    password: hashedPassword,
                    username
                }
                const userCreate = await userRepository.createUser(dataUserSave)
                if (!validationUtils.isNullOrEmpty(userCreate)) {
                    await cartRepository.createCart(userCreate.id)
                    await otpRepository.deleteOtpByEmail(valueOTP.email)
                }
                return res.status(200).json({ success: true, message: "Bạn đã đăng ký thành công" })
            }

            return res.status(400).json({ success: true, message: "Mã OTP đã hết hạn !" })
        } catch (error) {
            return res.status(500).json({ success: false, message: vi.serverError, error })
        }
    }

    static async sendOTPRegister(req, res) {
        const { email, username } = req.body
        if (!email || !username) {
            return res
                .status(400)
                .json({ success: false, message: 'Email và tên người dùng không được để trống !' })
        }
        emailService.sendOTP(res, TYPE_SEND_OTP.REGISTER, email, username)
    }

    static async sendOTPForgotPassword(req, res) {
        const { email } = req.body
        if (!email) {
            return res
                .status(400)
                .json({ success: false, message: 'Vui lòng nhập đủ thông tin !' })
        }
        emailService.sendOTP(res, TYPE_SEND_OTP.FORGOT_PASSWORD, email)
    }



    static async checkChangePassword(req, res) {
        const { oldPassword } = req.body
        const idUser = req.user.id
        if (!oldPassword) {
            return res
                .status(400)
                .json({ success: false, message: 'Vui lòng nhập đủ thông tin !' })
        }
        try {
            // const [userExist] = await pool.query(`SELECT * FROM user WHERE id = ? AND deleted = ?`, [idUser, 0]);
            const userExist = await userRepository.getUserById(idUser);
            if (validationUtils.isNullOrEmpty(userExist)) {
                return res
                    .status(400)
                    .json({ success: false, message: 'Tài khoản không tồn tại !' })
            }
            // id found
            const passwordValid = await verifyUtils.verifyPassword(userExist[0].password, oldPassword)
            if (!passwordValid)
                return res
                    .status(400)
                    .json({ success: false, message: 'Mật khẩu cũ không chính xác' })
            emailService.sendOTP(res, TYPE_SEND_OTP.CHANGE_PASSWORD, userExist[0].email)
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}

module.exports = AuthService;