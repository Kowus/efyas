var express = require('express');
var router = express.Router();
var User = require('../models/users.model');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Restaurant = require('../models/restaurants.model');

var OBJ = null;


router.get('/register', function (req, res, next) {
	res.render('register', {
		title: "User Registration"
	});
});
router.get('/login', function (req, res, next) {
	res.render('login', {
		title: "User Login: easy-eat"
	});
});

router.post('/register', function (req, res, next) {
	// var errors = [];
	var newError =[];
	var tempBool = false;
	var email = req.body.email;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var sex = req.body.sex;
	var phone = req.body.phone;
	var username = req.body.username.trim().toLowerCase();
	var password = req.body.password + 'a';
	var password2 = req.body.password2 + 'a';
	var account_type = req.body.account_type.trim().toLowerCase();
	var name = req.body.name;

	//Validation
	if (account_type === 'user') {
		req.checkBody('firstname', 'First Name is required').notEmpty();
		req.checkBody('lastname', 'Last Name is required').notEmpty();
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email not valid').isEmail();
		req.checkBody('account_type', 'Account type is required').notEmpty();
		req.checkBody('email', 'This email is already bound to another account').isUniqueEmail(User);
		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('username', 'Username has been taken').isUniqueUser(User);
		req.checkBody('username', 'Username already exists');
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
		var errors = req.validationErrors();


	} else {
		req.checkBody('name', 'Name of Your Establishment is required').notEmpty();
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email not valid').isEmail();
		req.checkBody('email', 'This email is already bound to another account').isUniqueEmail(Restaurant);
		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('username', 'Username has been taken').isUniqueUser(Restaurant);
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
		var errors = req.validationErrors();


	}



	if (errors) {
		res.render('register', {
			errors: errors,
			title: 'User Registration'
		});
	} else {
		if (account_type == 'user') {
			var newUser = new User({
				firstname: firstname,
				lastname: lastname,
				email: email,
				sex: sex,
				phone: phone,
				username: username,
				password: password,
				account_type: account_type
			});

			User.createUser(newUser, function (err, user) {
				if (err) console.error(err.toJSON());
				console.log(user);
			});
		} else if (account_type == 'restaurant') {
			var newRestaurant = new Restaurant({
				name: name,
				email: email,
				phone: phone,
				username: username,
				password: password,
				account_type: account_type
			});
			Restaurant.createRestaurant(newRestaurant, function (err, restaurant) {
				if (err) return console.error(err);
				console.log(restaurant)
			})
		}

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw  err;
			if (!user) {
				Restaurant.getRestaurantByUsername(username, function (err, user) {
					OBJ = Restaurant;
					if (err) throw  err;
					if (!user) {
						return done(null, false, {message: 'Unknown User'});
					}

					Restaurant.comparePassword(password, user.password, function (err, isMatch) {
						if (err) throw  err;
						if (!isMatch) {
							return done(null, user);
						} else {
							return done(null, false, {message: 'Invalid Password'});
						}
					});
				});

				// return done(null, false, {message: 'Unknown User'});
			} else {
				OBJ = User;
				User.comparePassword(password, user.password, function (err, isMatch) {
					if (err) throw  err;
					if (!isMatch) {
						return done(null, user);
					} else {
						return done(null, false, {message: 'Invalid Password'});
					}
				});
			}
		});

	}
));


passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	OBJ.getUserById(id, function (err, user) {
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

module.exports = router;
