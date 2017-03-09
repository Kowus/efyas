var mongoose =  require('mongoose');
var Schema = mongoose.Schema;


var foodSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},restaurants: [{
			id: {type:Schema.Types.ObjectId}
	}]
});

module.exports = mongoose.model('food', foodSchema);
