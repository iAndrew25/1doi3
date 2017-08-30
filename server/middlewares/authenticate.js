const User = require('../models/user');
const {TOKEN_SALT} = require('../config.json');
const jwt = require('jsonwebtoken');

let authenticate = (req, res, next) => {
	let token = req.header('x-auth') || req.body.token || req.query.token;

	if(token) {
		jwt.verify(token, TOKEN_SALT, function(err, decoded) {      
			if(err) {
				return res.send({success: false, message: 'Failed to authenticate token.'});    
			} else {
				User.findById(decoded._id)
					.then(user => {
						if(user) {
							req.user = user;
							next();
						} else {
							return Promise.reject()
						}
					})
					.catch(e => res.status(404).send({success: false, message: 'User not found.'}))
			}
		});
	} else {
		return res.status(403).send({success: false, message: 'No token provided.'});
	}
}

module.exports = {authenticate};