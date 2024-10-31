const prisma = require("../prisma");

class CartRepository {

    // Lấy thông tin cart của một user
    static async getCartByUserId(userId) {
        return await prisma.cart.findFirst({
            where: { id_user: userId },
            select: {
                id: true
            },
        });
    }

    // Tạo mới một cart
    static async createCart(userId) {
        return await prisma.cart.create({
            data: {
                id_user: userId,
            },
        });
    }

    // Lấy một cart theo ID
    static async getCartById(cartId) {
        return await prisma.cart.findUnique({
            where: { id: cartId },
            include: { cart_detail: true, user: true }, // Bao gồm chi tiết cart và thông tin user
        });
    }



    // Cập nhật thông tin cart (ví dụ: cập nhật thời gian updateAt)
    static async updateCart(cartId, data) {
        return await prisma.cart.update({
            where: { id: cartId },
            data,
        });
    }

    // Xóa một cart theo ID
    static async deleteCart(cartId) {
        return await prisma.cart.delete({
            where: { id: cartId },
        });
    }

}

module.exports = CartRepository;
