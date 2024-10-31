// src/controllers/productController.js
const express = require('express');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/VerifyToken');
const productService = require('../service/ProductService');

const router = express.Router();

router.post("/search", productService.search);
router.get("/page", productService.getPageCount);
router.get("/detail/:id", productService.getById);
router.get("/", productService.getAll);
router.post("/", verifyTokenAndAdmin, productService.create);
router.put("/update/:id", verifyTokenAndAdmin, productService.update);
router.put("/delete/:id", verifyTokenAndAdmin, productService.softDelete);
router.put("/cancel-delete/:id", verifyTokenAndAdmin, productService.restore);

module.exports = router;
