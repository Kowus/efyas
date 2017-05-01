var express = require('express');
var router = express.Router();
var Rests = require('../models/restaurants.model');

var restaurants = require('./restaurants');

/* GET home page. */
router.get('/', function(req, res, next) {
	Rests.find({}).exec(function (err, results) {
		if (err) {
			res.send('an error has occurred' + err);
		}
		else {
			console.log("loaded restaurantss");
			if(!req.user) {
				res.render('index', {title: 'easy-eat &#174;', rests: results});
			}else{
				res.redirect('/dashboard')
			}
		}
	});
});


router.get('/dashboard', ensureAuthenticated, function (req, res, next) {
	if (req.user.account_type === 'user') {
		res.render('user_dash', {
			title: 'easy-eat &#174;',
			user :req.user
		});
	}else if(req.user.account_type === 'restaurant'){
		res.render('rest_dash',{
			title: 'easy-eat &#174;',
			user:req.user
		})
	}
});

router.use('/restaurants', ensureAuthenticated,restaurants);

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		console.log("UNAUTHORIZED ACCESS");
		res.redirect('/users/login');
	}
}





module.exports = router;
