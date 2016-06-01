var mongoose = require('../libs/mongoose');
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;
var config = require('../config');

var UserSchema = new Schema({
	username: String,
	password: String,
	active: Boolean,
	groups: [String]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;

// Init default user and password
User.findOne({username: config.get("rootName")}, function(err, user) {
	if(!user) {	
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(config.get("rootPassword"), salt, function(err, hash) {
				var admin = new User({username: config.get("rootName"), password: hash, active: true, groups: ["Administrators"]});
				admin.save();        
		    });
		});
	}
});