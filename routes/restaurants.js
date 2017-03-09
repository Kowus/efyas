var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurants.model');

/* GET users listing. */
router.get('/', function (req, res, next) {
	Restaurant.find({}).exec(function (err, results) {
		if ( err ) {
			res.send('an error has occurred' + err);
		}
		else {
			console.log("loaded restaurantss");
			res.json(results)
		}
	});
});

router.get('/add', function (req, res, next) {
	res.render('add', {
		title: 'Add an entry'
	});
});

router.post('/add/create', function (req, res, next) {
	var resdets = req.body;
	var newRestaurant = new Restaurant({
		name:     resdets.name,
		location: { description: resdets.locDes },
		item:     {
			name:  resdets.itemName,
			price: resdets.itemPrice
		}
	});
	newRestaurant.save(function (err, restaurant) {
		if ( err ) {
			console.error(err.message)
			res.json(err);
		} else {
			console.log("Saved!")
			res.json(restaurant);
		}
	});
});

module.exports = router;
