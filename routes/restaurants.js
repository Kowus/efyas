var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurants.model');
var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;



router.post('/:id/add', function (req,res,next) {
	Restaurant.update({_id: req.params.id},{
		$push:{
			menu:{
				$each:[{
					name: req.body.name,
					price: req.body.price,
					category: req.body.categories,
					description: req.body.description
				}]
			}
		}
	},function (err, data) {
		if(err){
			res.render('rest_dash',  {
				title: 'easy-eat &#174;',
				error :'Could not add entry for '+req.body.name
			})
		}else {
			res.render('rest_dash',  {
				title: 'easy-eat &#174;',
				success :'Created entry for '+req.body.name
			})
		}

		}
	)
});

router.get('/rest_details', function (req, res, next) {
	Restaurant.find({},{password:0},function (err, data) {
		if (err) res.send("an error occurred, please try later");
		else{
			res.json(data)
		}
	})
})

module.exports = router;
