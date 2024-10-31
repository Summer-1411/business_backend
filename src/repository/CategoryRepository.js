// src/repositories/categoryRepository.js

const prisma = require("../prisma");


class CategoryRepository {
    static async getAll() {
        return await prisma.category.findMany({
            where: {
                status: 1
            },
        });
    }

    static async search(name, status) {
        return await prisma.category.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
                ...(status !== undefined && { status }),
            },
        });
    }

    static async create(name) {
        return await prisma.category.create({
            data: { name },
        });
    }

    static async update(id, data) {
        // cons {name, status} = data
        return await prisma.category.update({
            where: { id },
            data: { ...data, updateAt: new Date() },
        });
    }

    static async deleteById(id) {
        return await prisma.category.update({
            where: { id },
            data: { status: 0, updateAt: new Date() },
        });
    }
}

module.exports = CategoryRepository;
