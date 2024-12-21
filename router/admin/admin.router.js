const express = require('express');
const router = express.Router();
const controler = require('../../controller/admin/admin');
const systemPath = require('../../config/system');
const PATH_URL = systemPath.firstPath;
router.get(PATH_URL+'/dashboard', controler.configs);

module.exports = router;