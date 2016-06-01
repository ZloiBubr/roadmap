var bcrypt = require("bcrypt");
var User = require("../models/user");

exports.register = function (req, res) {

	User.findOne({username: req.body.username}, function(err, user) {
		if(err) {
  			res.status(401).send("Error: " + err);
  		}
  		else {
  			if(user) {
  				res.status(401).send("User with such username already exists.");		
  			}
  			else {
  				bcrypt.genSalt(10, function(err, salt) {
				    bcrypt.hash(req.body.password, salt, function(err, hash) {
						  var user = new User({username: req.body.username, password: hash, active: false, groups: []});
						  user.save();
						  res.json({ success: true });        
				    });
				});
  			}
  		}
	})
};