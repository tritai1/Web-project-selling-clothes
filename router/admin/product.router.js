const express = require('express');
const multer  = require('multer')
const storageMulti = require('../../helper/changesImg')
const router = express.Router();
const upload = multer({ storage: storageMulti()})
const controler = require('../../controller/admin/product.controler');
const validate = require('../../validate/admin/product.validate')

router.get('/',controler.product);
router.patch('/change-status/:status/:id', controler.changeStatus);
router.patch('/change-multi', controler.changeMulti);
router.patch('/delete/:id', controler.deleteItem);
router.get('/recycle',controler.recycle);
router.delete('/recycle/deleted/:id',controler.recycleDelete);
router.patch('/recycle/update/:id',controler.update);
router.patch('/recycle/change-multi/:status/:id',controler.changeMultiRecycle);
router.get('/create', controler.create);
router.post('/create', upload.single('thumbnail'), validate.createValidate, controler.createProduct);
router.get('/edit/:id', controler.editProduct);


module.exports = router;