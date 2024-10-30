const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

    // Update user by ID
    static async updateUser(id, data) {
        return await prisma.user.update({
            where: { id },
            data,
        });
    }

    // Delete (soft delete) user by ID
    static async deleteUser(id) {
        return await prisma.user.update({
            where: { id },
            data: { deleted: true },
        });
    }

}

module.exports = UserRepository;
