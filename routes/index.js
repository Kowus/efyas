var express = require('express');
var router = express.Router();
var Rests = require('../models/restaurants.model'); 
/* GET home page. */
router.get('/', function(req, res, next) {
	Rests.find({}).exec(function (err, results) {
		if (err) {
			res.send('an error has occurred' + err);
		}
		else {
			console.log("loaded restaurantss");
			res.render('index', { title: 'easy-eat &#174;', rests:results });
		}
	});
});


router.get('/dashboard', ensureAuthenticated, function (req, res, next) {
	res.render('user_dash', {
		title: 'easy-eat &#174;'
	});
});


function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/users/login');
	}
}



module.exports = router;
