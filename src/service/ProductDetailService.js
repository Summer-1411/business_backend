const productDetailRepository = require('../repository/ProductDetailRepository');

class ProductDetailService {
    static async getProductDetailById(req, res) {
        try {
            const productDetail = await productDetailRepository.findById(req.params.id);
            return res.status(200).json({ success: true, filter: productDetail });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error!" });
        }
    }

    static async getAllColorsByProductId(req, res) {
        try {
            const colors = await productDetailRepository.findDistinctColors(req.params.id);
            return res.status(200).json({ success: true, colors });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error!" });
        }
    }

    static async getAllSizesByProductId(req, res) {
        try {
            const sizes = await productDetailRepository.findDistinctSizes(req.params.id);
            return res.status(200).json({ success: true, sizes });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error!" });
        }
    }

    static async getSizesByColorAndProductId(req, res) {
        try {
            const { color, idpro } = req.query;
            const sizes = await productDetailRepository.findSizesByColorAndProductId(color, idpro);
            return res.status(200).json({ success: true, sizes });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error!" });
        }
    }

    static async getColorsBySizeAndProductId(req, res) {
        try {
            const { size, idpro } = req.query;
            const colors = await productDetailRepository.findColorsBySizeAndProductId(size, idpro);
            return res.status(200).json({ success: true, colors });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error!" });
        }
    }

    static async getImageByColorAndProductId(req, res) {
        try {
            const { color, idpro } = req.query;
            const image = await productDetailRepository.findImageByColorAndProductId(color, idpro);
            return res.status(200).json({ image: image });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error!" });
        }
    }

    static async getProductDetails(req, res) {
        try {
            const { size, color, idpro } = req.query;
            const detail = await productDetailRepository.findDetail(size, color, idpro);
            return res.status(200).json({ success: true, detail });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error!" });
        }
    }

    static async addProductDetail(req, res) {
        try {
            const productDetail = await productDetailRepository.create(req.body);
            return res.status(200).json({ success: true, message: "Added successfully", id: productDetail.id });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error!" });
        }
    }

    static async updateProductDetail(req, res) {
        try {
            await productDetailRepository.update(req.params.id, req.body);
            return res.status(200).json({ success: true, message: "Updated successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error!" });
        }
    }

    static async deleteProductDetail(req, res) {
        try {
            await productDetailRepository.softDelete(req.params.id);
            return res.status(200).json({ success: true, message: "Deleted successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error!" });
        }
    }
}

module.exports = ProductDetailService;
