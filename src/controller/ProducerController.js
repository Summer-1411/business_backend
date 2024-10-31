// src/controllers/producerController.js
const express = require('express');
const { verifyTokenAndAdmin } = require('../middleware/VerifyToken');
const producerService = require('../service/ProducerService');

const router = express.Router();

router.get('/', producerService.getAll);
router.post('/search', producerService.search);
router.post('/create', verifyTokenAndAdmin, producerService.create);
router.post('/update/:id', verifyTokenAndAdmin, producerService.update);
router.delete('/delete/:id', verifyTokenAndAdmin, producerService.delete);

module.exports = router;
