var express = require('express');
var router = express.Router();

const controller = require("../controllers/getAllUsers")


router.get('/all', controller.getAllUsers);

module.exports = router;