const express = require('express');
const router = express.Router(); // hàm Router giúp có thể tạo cách router con
const controller = require('../../controller/client/product.controlers')
router.get('/',controller.product)

router.get('/add', (req, res)=>{
    res.send("<h1> thêm trang sản phẩm</h1>")
})

router.get('/delete', (req, res)=>{
    res.send("<h1>xóa trang sản phẩm</h1>")
})
router.get('/detail/:slug', controller.detail)

module.exports = router;