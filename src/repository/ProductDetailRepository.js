const prisma = require('../prisma');

class ProductDetailRepository {
    static async findById(id) {
        return await prisma.product_detail.findMany({
            where: { id_pro: parseInt(id), deleted: 0 },
        });
    }

    static async findDistinctColors(id_pro) {
        return await prisma.product_detail.findMany({
            where: { id_pro: parseInt(id_pro), deleted: 0 },
            distinct: ['color'],
            select: { color: true },
        });
    }

    static async findDistinctSizes(id_pro) {
        return await prisma.product_detail.findMany({
            where: { id_pro: parseInt(id_pro), deleted: 0 },
            distinct: ['size'],
            select: { size: true },
        });
    }

    static async findSizesByColorAndProductId(color, id_pro) {
        return await prisma.product_detail.findMany({
            where: { id_pro: parseInt(id_pro), color: color, deleted: 0 },
            distinct: ['size'],
            select: { id: true, size: true },
        });
    }

    static async findColorsBySizeAndProductId(size, id_pro) {
        return await prisma.product_detail.findMany({
            where: { id_pro: parseInt(id_pro), size: size, deleted: 0 },
            distinct: ['color'],
            select: { id: true, color: true, img: true },
        });
    }

    static async findImageByColorAndProductId(color, id_pro) {
        const result = await prisma.product_detail.findFirst({
            where: { id_pro: parseInt(id_pro), color: color, deleted: 0 },
            select: { img: true },
        });
        return result?.img;
    }

    static async findDetail(size, color, id_pro) {
        return await prisma.product_detail.findFirst({
            where: { id_pro: parseInt(id_pro), size: size, color: color, deleted: 0 },
        });
    }

    static async create(data) {
        return await prisma.product_detail.create({
            data: {
                id_pro: data.id_pro,
                size: data.size,
                color: data.color,
                quantity: Number(data.quantity),
                price: Number(data.price),
                img: data.img,
            },
        });
    }

    static async update(id, data) {
        return await prisma.product_detail.update({
            where: { id: parseInt(id) },
            data: {
                ...data,
                quantity: data.quantity ? Number(data.quantity) : undefined,
                price: data.price ? Number(data.price) : undefined,
            },
        });
    }

    static async softDelete(id) {
        return await prisma.product_detail.update({
            where: { id: parseInt(id) },
            data: { deleted: 1 },
        });
    }
}

module.exports = ProductDetailRepository;
