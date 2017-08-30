const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const {TOKEN_SALT} = require('../config.json');

let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String
	},
	active: {
		type: Boolean,
		default: false
	}
});

/*UserSchema.methods.toJSON = function() {
	return _.pick(this.toObject(), ['_id', 'email']);
}*/

UserSchema.methods.generateAuthToken = function() {
	return jwt.sign({
		_id: this._id.toHexString(),
	}, TOKEN_SALT, {expiresIn: 86400}).toString();
}

let User = mongoose.model('User', UserSchema);

module.exports = User;