
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	fb: {
		id: String,
		access_token: String,
		firstName: String,
		lastName: String,
		email: String,
		displayName: String,
		gender: String,
		picture: String,
		about: String
	},
	twitter: {
		id: String,
		token: String,
		username: String,
		displayName: String,
		lastStatus: String
	}
	
});