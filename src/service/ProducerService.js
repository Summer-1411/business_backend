// src/services/ProducerService.js
const vi = require("../messages/message_vi");
const producerRepository = require('../repository/ProducerRepository');

class ProducerService {
    static async getAll(req, res) {
        try {
            const producers = await producerRepository.getAll();
            return res.json({ success: true, producer: producers });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }

    static async search(req, res) {
        try {
            const producers = await producerRepository.search(req.body);
            return res.json({ success: true, producer: producers });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }

    static async create(req, res) {
        const { name } = req.body;
        try {
            const producer = await producerRepository.create(name);
            return res.status(200).json({ success: true, message: "Thêm mới hãng sản xuất thành công", id: producer.id });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }

    static async update(req, res) {
        const { name, status } = req.body;
        const { id } = req.params;
        try {
            await producerRepository.update(id, { name, status });
            return res.status(200).json({ success: true, message: "Cập nhật thành công" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            await producerRepository.deleteById(id);
            return res.status(200).json({ success: true, message: "Xóa thành công" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: vi.serverError });
        }
    }
}

module.exports = ProducerService;
