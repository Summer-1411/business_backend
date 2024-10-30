const { TYPE_SEND_OTP } = require('../constant');
const userRepository = require('../repository/UserRepository')
const otpRepository = require('../repository/OtpRepository')
const validationUtils = require("../utils/ValidationUtils")
const { validExpiresTime } = require("../utils/TimeUtils")
const otpGenerator = require('otp-generator');
const { getBodyHTMLEmail, getBodyHTMLForgotPassword, sendUserEmail, getBodyHTMLChangePassword } = require('../utils/SendMailUtils');


class EmailService {
    static async sendOTP(res, type, email, username) {
        try {
            const userExist = await userRepository.getUserByEmail(email);
            const otpExist = await otpRepository.getOtpByEmail(email);

            if (type === TYPE_SEND_OTP.REGISTER) {
                if (userExist) {
                    return res.status(400).json({ success: false, message: "Email đã tồn tại !" })
                }
            } else if (type === TYPE_SEND_OTP.FORGOT_PASSWORD || type === TYPE_SEND_OTP.CHANGE_PASSWORD) {
                if (validationUtils.isNullOrEmpty(userExist)) {
                    return res.status(400).json({ success: false, message: "Tài khoản email không tồn tại !" })
                }
            }

            if (otpExist) {
                // nếu mã chưa quá 2p
                let checkValidResendEmail = validExpiresTime(otpExist?.createAt, 2)
                if (checkValidResendEmail) {
                    return res.status(400).json({ success: false, message: "Mã OTP đã được gửi. Hai lần gửi cách nhau tối thiểu 2 phút !. Vui lòng kiểm tra lại hộp thư email !" })
                }
            }

            //send mail
            const otp = await generateUniqueOtp();
            const data = prepareEmailData(type, email, username, otp);
            const rs = await sendUserEmail(data)
            //create otp
            const currentDateTime = new Date();
            const dataSave = {
                otp: otp,
                email: email,
                createAt: currentDateTime
            }
            await otpRepository.createOtp(dataSave);
            return res.status(200).json({ success: true, message: "Gửi mã OTP thành công !" })
        } catch (error) {
            console.log('error', error);
            return res.status(500).json({ success: false, message: "Internal server error", error })
        }
    }



}


function prepareEmailData(type, email, username, otp) {
    const templates = {
        [TYPE_SEND_OTP.REGISTER]: {
            email,
            subject: "Xác nhận đăng ký",
            html: getBodyHTMLEmail({ username, otp }),
        },
        [TYPE_SEND_OTP.FORGOT_PASSWORD]: {
            email,
            subject: "Lấy lại mật khẩu",
            html: getBodyHTMLForgotPassword({ email, otp }),
        },
        [TYPE_SEND_OTP.CHANGE_PASSWORD]: {
            email,
            subject: "Cập nhật mật khẩu",
            html: getBodyHTMLChangePassword({ email, otp }),
        },
    };


    return templates[type] || null;
}

async function generateUniqueOtp() {
    let otp;

    while (true) {
        // Tạo mã OTP ngẫu nhiên gồm 6 chữ số
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // Kiểm tra mã OTP có tồn tại trong bảng `otp` không
        const existingOtp = await otpRepository.getOtpByOtpCode(otp);

        // Nếu không tồn tại (existingOtp là null), thoát khỏi vòng lặp
        if (!existingOtp) {
            break;
        }
    }
    return otp;
}


module.exports = EmailService