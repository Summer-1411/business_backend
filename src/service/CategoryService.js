// src/controllers/categoryController.js
const vi = require("../messages/message_vi")
const categoryRepository = require('../repository/CategoryRepository')
class CategoryService {
    static async getAll(req, res) {
        try {
            const categories = await categoryRepository.getAll();
            return res.json({ success: true, category: categories });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError, error });
        }
    }

    static async search(req, res) {
        try {
            const categories = await categoryRepository.search(req.body);
            return res.json({ success: true, category: categories });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError, error });
        }
    }

    static async create(req, res) {
        const { name } = req.body;
        try {
            const category = await categoryRepository.create(name);
            return res.status(200).json({ success: true, message: "Thêm mới loại sản phẩm thành công", id: category.id });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Internal server error !" });
        }
    }

    static async update(req, res) {
        const { name, status } = req.body;
        const { id } = req.params;
        try {
            await categoryRepository.update(id, { name, status });
            return res.status(200).json({ success: true, message: "Cập nhật thành công" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Internal server error !" });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            await categoryRepository.deleteById(id);
            return res.status(200).json({ success: true, message: "Xóa thành công" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Internal server error !" });
        }
    }
}

module.exports = CategoryService;
