var express = require('express');
var router = express.Router();

const controller = require("../controllers/messages")


router.get('/getAll', controller.getAllMessages);
router.get('/addMessage', controller.addMessage);

module.exports = router;