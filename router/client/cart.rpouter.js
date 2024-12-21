const express = require('express');
const router = express.Router(); // hàm này có sẵn trong express nó dùng để tọa các router con
const controller = require('../../controller/client/cart.controler')
router.get('/', controller.cart)
router.get('/add', (req, res)=>{
    res.send(`<h1>them giỏ hàng</h1>`)
})
router.get('/delete', (req, res)=>{
    res.send(`<h1>xoa giỏ hàng</h1>`)
})
module.exports = router;