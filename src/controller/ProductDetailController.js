const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middleware/VerifyToken');
const productDetailService = require('../service/ProductDetailService');

// GET product_detail by id
router.get('/find/:id', productDetailService.getProductDetailById);

// GET ALL COLOR by product id
router.get('/color/:id', productDetailService.getAllColorsByProductId);

// GET ALL SIZE by product id
router.get('/size/:id', productDetailService.getAllSizesByProductId);

// GET ALL SIZE by color and product
router.get('/searchsize', productDetailService.getSizesByColorAndProductId);

// GET ALL COLOR by size and product
router.get('/searchcolor', productDetailService.getColorsBySizeAndProductId);

// Get image by color
router.get('/img', productDetailService.getImageByColorAndProductId);

// GET quantity and price by size, color, and product id
router.get('/details', productDetailService.getProductDetails);

// Add new product detail
router.post('/', verifyTokenAndAdmin, productDetailService.addProductDetail);

// Update product detail by id
router.put('/update/:id', verifyTokenAndAdmin, productDetailService.updateProductDetail);

// Soft delete product detail by id
router.put('/delete/:id', verifyTokenAndAdmin, productDetailService.deleteProductDetail);

module.exports = router;
