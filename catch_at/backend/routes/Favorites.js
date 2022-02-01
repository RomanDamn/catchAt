var express = require('express');
var router = express.Router();

const controller = require("../controllers/Favorites")


router.post('/add', controller.addToFavorites);
router.delete('/delete', controller.removeFromFavorites);
router.get('/getAll', controller.getAllFavorites);

module.exports = router;