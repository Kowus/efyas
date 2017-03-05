var express = require('express');
var router = express.Router();
var restaurant = require('../models/restaurants.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add',function (req, res, next) {
    res.render('add route');
});

module.exports = router;
