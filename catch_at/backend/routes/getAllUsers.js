var express = require('express');
var router = express.Router();

const controller = require("../controllers/getUsers")


router.get('/all', controller.getAllUsers);
router.post('/messagedUsers', controller.getMessagedUsers);

module.exports = router;