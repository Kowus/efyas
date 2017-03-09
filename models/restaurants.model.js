var mongoose = require('mongoose');
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
	item:     [{
		name:  {
			type:     String,
			required: true
		},
		price: {
			type:     Number,
			required: true
		}
	}]
});

module.exports = mongoose.model('restaurants', restaurantSchema);
