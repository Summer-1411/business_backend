// src/services/ProductService.js
const vi = require("../messages/message_vi");
const productRepository = require('../repository/ProductRepository');

class ProductService {


    static async search(req, res) {
        const { sample, orders } = req.body;
        try {
            const products = await productRepository.search(sample, orders);
            return res.status(200).json({ success: true, data: products });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }

    static async getPageCount(req, res) {
        try {
            const pageCount = await productRepository.getPageCount(0);
            return res.status(200).json({ success: true, numPages: Math.ceil(pageCount / 12) });
        } catch (error) {
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const product = await productRepository.getById(id);
            return res.status(200).json({ success: true, product });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }

    static async getAll(req, res) {
        const { category, producer, id, page = 1 } = req.query;
        try {
            const products = await productRepository.getAll(0, page, 12);
            return res.status(200).json({ success: true, products });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }

    static async create(req, res) {
        const { name, description, information, priceRange, status, img, id_owner, id_category } = req.body;
        try {
            const product = await productRepository.create({
                name, description, information, priceRange, status, img, id_owner, id_category, deleted: 0
            });
            return res.status(201).json({ success: true, message: "Thêm mới sản phẩm thành công", product });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { name, description, information, status, img, id_owner, id_category } = req.body;
        try {
            await productRepository.update(id, { name, description, information, status, img, id_owner, id_category });
            return res.status(200).json({ success: true, message: "Cập nhật sản phẩm thành công" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }

    static async softDelete(req, res) {
        const { id } = req.params;
        try {
            await productRepository.softDelete(id);
            return res.status(200).json({ success: true, message: "Xoá sản phẩm thành công" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }

    static async restore(req, res) {
        const { id } = req.params;
        try {
            await productRepository.restore(id);
            return res.status(200).json({ success: true, message: "Khôi phục sản phẩm thành công" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }
}

module.exports = ProductService;
