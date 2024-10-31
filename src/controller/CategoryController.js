const express = require('express');
const { verifyTokenAndAdmin } = require('../middleware/VerifyToken');
const categoryService = require('../service/CategoryService')
const router = express.Router()


router.get('/', categoryService.getAll)

router.post('/search', categoryService.search)

router.post('/create', verifyTokenAndAdmin, categoryService.create)

router.post('/update/:id', verifyTokenAndAdmin, categoryService.update)

router.delete('/delete/:id', verifyTokenAndAdmin, categoryService.delete)



module.exports = router