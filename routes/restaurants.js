var express = require('express');
var router = express.Router();
// var Restaurant = require('../models/restaurants.model');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



/*
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


router.post('/register', function (req, res, next) {
	var email = req.body.email;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var sex = req.body.sex;
	var phone = req.body.phone;
	var username = req.body.username;
	var password = req.body.password+'a';
	var password2 = req.body.password2+'a';
	var account_type = req.body.account_type;

	//Validation
	req.checkBody('firstname', 'First Name is required').notEmpty();
	req.checkBody('lastname', 'Last Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors)
	{
		res.render('register', {
			errors: errors,
			title: 'Restaurant Registration'
		});
	}else
	{
		var newRestaurant = new Restaurant({
			firstname:firstname,
			lastname:lastname,
			email: email,
			sex: sex,
			phone: phone,
			username: username,
			password: password,
			account_type: account_type
		});

		Restaurant.createRestaurant(newRestaurant, function (err, user) {
			if (err) throw  err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});


passport.use(new LocalStrategy(
	function (username, password, done) {
		Restaurant.getRestaurantByUsername(username, function (err, user) {
			if (err) throw  err;
			if(!user)
			{
				return done(null, false, {message: 'Unknown Restaurant'});
			}

			Restaurant.comparePassword(password, user.password, function (err, isMatch) {
				if(err) throw  err;
				if(!isMatch)
				{
					return done(null, user);
				}else
				{
					return done(null, false, {message: 'Invalid Password'});
				}
			});
		});
	}
));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	Restaurant.getRestaurantById(id, function (err, user) {
		done(err, user)
	});
});

router.post('/login', passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash: true
	}),
	function (req, res, next) {
		res.redirect('/dashboard');
	});

router.get('/logout', function (req, res) {
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/');
});
*/

module.exports = router;
