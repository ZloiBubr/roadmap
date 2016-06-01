var User = require("../models/user");

exports.save = function(req, res) {
	
	delete req.body.__v;
	delete req.body._id;
	delete req.body.$resolved;

	User.update({_id: req.params.id}, req.body, function(err, raw){
		res.end();
	});
};

exports.query = function(req, res) {
	
	User.find({}, function(err, users) {
		if(err) {
			res.status(500).send("Error:" + err);
		} else {
			res.json(users);
		}
	});
};

exports.get = function(req, res) {

	User.findOne({id: req.params.id}, function(err, user) {
		if(err) {
			res.status(500).send("Error:" + err);
		}
		else {
			res.json(user);
		}
	});
}