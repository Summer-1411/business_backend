const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

    //Xóa otp theo email khi đã đăng ký/đặt lại mật khẩu thành công
    async deleteOtpByEmail(email) {
        const result = await prisma.otp.deleteMany({
            where: { email: email },
        });
        return result;
    }

}

module.exports = OtpRepository;
