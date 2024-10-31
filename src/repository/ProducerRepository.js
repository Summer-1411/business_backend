// src/repositories/ProducerRepository.js

const prisma = require("../prisma");



class ProducerRepository {
    static async getAll() {
        return await prisma.producer.findMany({
            where: {
                status: 1
            },
        });
    }

    static async search({ name, status }) {
        return await prisma.producer.findMany({
            where: {
                ...(name && {
                    name: {
                        contains: name,
                        mode: 'insensitive',
                    },
                }),
                ...(status !== undefined && { status }),
            },
        });
    }

    static async create(name) {
        return await prisma.producer.create({
            data: { name },
        });
    }

    static async update(id, { name, status }) {
        return await prisma.producer.update({
            where: { id },
            data: { name, status, updateAt: new Date() },
        });
    }

    static async deleteById(id) {
        return await prisma.producer.update({
            where: { id },
            data: { status: 0, updateAt: new Date() },
        });
    }
}

module.exports = ProducerRepository;
