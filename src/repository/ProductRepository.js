// src/repositories/ProductRepository.js
const prisma = require("../prisma");

class ProductRepository {
    static async check() {
        return "Check success"; // Placeholder for the check endpoint
    }

    static async search(sample, orders) {
        return await prisma.product.findMany({
            where: {
                deleted: 0,
                ...(sample.name && {
                    name: {
                        contains: sample.name,
                        mode: 'insensitive',
                    },
                }),
                ...(sample.idCategory && { id_category: sample.idCategory }),
                ...(sample.idOwner && { id_owner: sample.idOwner }),
                ...(sample.id && { id: sample.id }),
            },
            orderBy: orders ? { [orders.property]: orders.direction } : undefined,
        });
    }

    static async getPageCount(deleted) {
        return await prisma.product.count({
            where: { deleted },
        });
    }

    static async getById(id) {
        return await prisma.product.findUnique({
            where: { id, deleted: 0 },
        });
    }

    static async getAll(deleted, page, limit) {
        return await prisma.product.findMany({
            where: { deleted },
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    static async create(data) {
        return await prisma.product.create({ data });
    }

    static async update(id, data) {
        return await prisma.product.update({
            where: { id },
            data,
        });
    }

    static async softDelete(id) {
        return await prisma.product.update({
            where: { id },
            data: { deleted: 1 },
        });
    }

    static async restore(id) {
        return await prisma.product.update({
            where: { id },
            data: { deleted: 0 },
        });
    }
}

module.exports = ProductRepository;
