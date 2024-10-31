const prisma = require("../prisma");

class OtpRepository {
    // Tạo mới một OTP
    static async createOtp(otpData) {
        return await prisma.otp.create({
            data: otpData,
        });
    }


    // Lấy OTP theo email
    static async getOtpByEmail(email) {
        return await prisma.otp.findFirst({
            where: { email: email },
            orderBy: { createAt: 'desc' },
        });
    }

    static async getOtpByOtpCode(otpCode) {
        return await prisma.otp.findFirst({
            where: { otp: otpCode },
        });
    }

    static async getLatestOtpRecord(otp) {
        return await prisma.otp.findFirst({
            where: {
                otp: otp,
            },
            orderBy: {
                createAt: 'desc',
            },
        });
    }


    //Xóa otp theo email khi đã đăng ký/đặt lại mật khẩu thành công
    static async deleteOtpByEmail(email) {
        const result = await prisma.otp.deleteMany({
            where: { email: email },
        });
        return result;
    }

}

module.exports = OtpRepository;
