var jwt = require("jsonwebtoken");
var User = require("../models/user");
var secret = 'roadmap';
var bcrypt = require("bcrypt");

exports.authenticate = function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');

	if (req.body.username === '' || req.body.password === '') {
    	res.send(401, 'Empty user or password');
    	return;
  	}

  	User.findOne({username: req.body.username}, function (err, user) {
  		if(err) {
  			res.status(401).send("Error: " + err);
  		}
  		else {
  			if(user) {
  			 
          bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(err) {
              res.status(401).send("Error: " + err);       
            }
            else if(result) {
              
              if(!user.active) {
                res.status(401).send("User is not active yet. Please contact the administrator to activate it.");   
              }
              else {
                var profile = {
                  id: user.id
                };

                // We are sending the profile inside the token
                var token = jwt.sign(profile, secret, { expiresInMinutes: 60 * 5 });

                res.json({ token: token, user: user });
              }    
            }
            else {
              res.status(401).send('Incorrect username or password');
            }

          });
  		}
      else {
        res.status(401).send('Incorrect username or password');
      }
  	}
  });
};