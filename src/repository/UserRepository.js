const prisma = require("../prisma");

class UserRepository {
    // Create a new user
    static async createUser(data) {
        return await prisma.user.create({
            data,
        });
    }

    // Get a user by ID
    static async getUserById(id) {
        return await prisma.user.findUnique({
            where: {
                id,
                deleted: 0
            },
        });
    }

    // Get a user by Email
    static async getUserByEmail(email) {
        return await prisma.user.findFirst({
            where: {
                email: email,
                deleted: 0
            }
        })
    }

    // Get all users
    static async getAllUsers() {
        return await prisma.user.findMany({
            where: {
                deleted: 0 // Thêm điều kiện deleted = 0
            },
        });
    }


    //update by email
    static async updatePasswordByEmail(email, password) {
        return await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                password: password,
                updateAt: new Date(),
            },
        })
    }

    // Delete (soft delete) user by ID
    static async deleteUser(id) {
        return await prisma.user.update({
            where: { id },
            data: { deleted: true },
        });
    }

    ///////////////////////
    static async getUserPages(deletedStatus) {
        const count = await prisma.user.count({
            where: { deleted: deletedStatus },
        });
        const numPages = Math.ceil(count / 5);
        return { numPages };
    }

    static async countDeletedUsers() {
        const numberDeleted = await prisma.user.count({
            where: { deleted: 1 },
        });
        return { numberDeleted };
    }

    static async searchUsers(name) {
        const users = await prisma.user.findMany({
            where: {
                username: {
                    contains: name,
                    mode: 'insensitive',
                },
                deleted: 0,
            },
        });
        return users;
    }

    static async getAllUsersV2(id, page, deletedStatus) {
        if (id) {
            const user = await prisma.user.findUnique({
                where: { id: id },
            });
            return user;
        }

        const limit = 5;
        const offset = (page - 1) * limit;

        const users = await prisma.user.findMany({
            where: { deleted: deletedStatus, isAdmin: 0 },
            orderBy: { createAt: 'desc' },
            skip: offset,
            take: limit,
        });
        return users;
    }

    static async updateUser(id, data) {
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                ...data,
                ...(data.birthday && { birthday: new Date(data.birthday) }), // chuyển đổi chuỗi ngày thành kiểu Date nếu cần
                updateAt: new Date() // cập nhật trường `updateAt` với thời gian hiện tại
            },
        });
        return updatedUser;
    }

    static async softDeleteUser(id) {
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                deleted: 1,
                updateAt: new Date() // cập nhật `updateAt` khi xóa
            },
        });
        return updatedUser;
    }

    static async restoreUser(id) {
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                deleted: 0,
                updateAt: new Date() // cập nhật `updateAt` khi khôi phục
            },
        });
        return updatedUser;
    }
}

module.exports = UserRepository;
