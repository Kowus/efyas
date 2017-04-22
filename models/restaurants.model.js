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
		index: true,
		unique: true,
		required: true
	},
	name:     {
		type:     String,
		required: true,
		unique:   true
	},
	location: {
		longitude:   Number,
		latitude:    Number,
		description: { type: String, required: true }
	},
	items:     [{
		name:  {
			type:     String,
			required: true
		},
		price: {
			type:     Number,
			required: true
		}
	}],
	password: {
		type: String,
		required: true
	},
	account_group: {
		type: String,
		default: "restaurant"
	}
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

module.exports.getRestaurantById = function (id, callback) {
	Restaurant.findById(id, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		if (err) throw err;
		callback(null, isMatch);
	});
};