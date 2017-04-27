var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

/*var Item= new Schema({
 name: {
 type:String,
 required: true
 },
 price: {
 type: Number,
 required: true
 }
 });*/

var restaurantSchema = new Schema({
	username: {
		type: String,
		required:true,
		unique:true
	},
	name:     {
		type:     String,
		required: true
	},
	location: {
		longitude:   Number,
		latitude:    Number,
		description: String
	},
	menu:     [{
		name:  {
			type:     String
		},
		price: {
			type:     Number
		},category:{
				type: Array
		}, reviews: [
			{
				stars: Number,
				body:String,
				author: Schema.Types.ObjectId

			}
		]
	}],
	password: {
		type: String,
		required: true
	},
	account_type: { type: String,
default: "restaurant"}
});

var Restaurant = module.exports = mongoose.model('restaurants', restaurantSchema);

module.exports.createRestaurant = function (newRestaurant, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newRestaurant.password, salt, function (err, hash) {
			newRestaurant.password = hash;
			newRestaurant.save(callback);
		});
	});
};

module.exports.getRestaurantByUsername = function (username, callback) {
	var query = {username: username};
	Restaurant.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
	Restaurant.findById(id, callback);
};
module.exports.getUserByEmail = function (email, callback) {
	var query = {email: email};
	User.findOne(query, callback);
};
module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		if (err) throw err;
		callback(null, isMatch);
	});
};