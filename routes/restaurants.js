var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurants.model');


/* GET users listing. */
router.get('/register', function (req, res, next) {
	res.render('register', {
		title: "Restaurant Registration"
	});
});

router.get('/login', function (req, res, next) {
	res.render('login', {
		title:"User Login: Restaurant"
	});
});
// Todo: Revisit later

module.exports = router;
