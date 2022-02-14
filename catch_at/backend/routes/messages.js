var express = require('express');
var router = express.Router();

const controller = require("../services/messagesService")


router.post('/', controller.getUserMessages);

module.exports = router;