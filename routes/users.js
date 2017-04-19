var express = require('express');
var router = express.Router();
// var Rests = require('../models/restaurants.model');
/* GET home page. */
router.get('/dashboard', function (req, res, next) {
	res.render('user_dash', {
		title: 'easy-eat &#174;'
	});
	
});

module.exports = router;
