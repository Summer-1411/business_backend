const userRepository = require('../repository/UserRepository');
const vi = require("../messages/message_vi")
class UserService {
    static async getActiveUserPages(req, res) {
        try {
            const pages = await userRepository.getUserPages(0);
            return res.status(200).json(pages);
        } catch (error) {
            return res.status(500).json({ success: false, message: vi.serverError, error });
        }
    }

    static async getDeletedUserPages(req, res) {
        try {
            const pages = await userRepository.getUserPages(1);
            return res.status(200).json(pages);
        } catch (error) {
            return res.status(500).json({ success: false, message: vi.serverError, error });
        }
    }

    static async countDeletedUsers(req, res) {
        try {
            const count = await userRepository.countDeletedUsers();
            return res.status(200).json({ success: true, count });
        } catch (error) {
            return res.status(500).json({ success: false, message: vi.serverError, error });
        }
    }

    static async searchUsers(req, res) {
        try {
            const users = await userRepository.searchUsers(req.query.name);
            return res.status(200).json({ success: true, users });
        } catch (error) {
            return res.status(500).json({ success: false, message: vi.serverError, error });
        }
    }

    static async getAllUsers(req, res) {
        try {
            const { id, page } = req.query;
            const users = await userRepository.getAllUsersV2(id, page, 0);
            return res.status(200).json({ success: true, users });
        } catch (error) {
            return res.status(500).json({ success: false, message: vi.serverError, error });
        }
    }

    static async getDeletedUsers(req, res) {
        try {
            const { id, page } = req.query;
            const users = await userRepository.getAllUsers(id, page, 1);
            return res.status(200).json({ success: true, users });
        } catch (error) {
            return res.status(500).json({ success: false, message: vi.serverError, error });
        }
    }

    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            await userRepository.updateUser(id, req.body);
            return res.status(200).json({ success: true, message: "User updated successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, message: vi.serverError, error });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await userRepository.softDeleteUser(id);
            return res.status(200).json({ success: true, message: "User deleted successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, message: vi.serverError, error });
        }
    }

    static async restoreUser(req, res) {
        try {
            const { id } = req.params;
            await userRepository.restoreUser(id);
            return res.status(200).json({ success: true, message: "User restored successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, message: vi.serverError, error });
        }
    }
}

module.exports = UserService;
