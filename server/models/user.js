const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const {SALT} = require('../config.json');

let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email.'
		}
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		minlength: 6
	},
	active: {
		type: Boolean,
		default: false
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true			
		}
	}]
});

UserSchema.methods.toJSON = function() {
	return _.pick(this.toObject(), ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
	let user = this;
	let access = 'auth';
	let token = jwt.sign({_id: user._id.toHexString(), access}, SALT).toString();

	user.tokens.push({access, token});

	return user.save().then(_ => token);
}

UserSchema.statics.findByToken = function(token) {
	let User = this;
	let decoded;

	try {
		decoded = jwt.verify(token, SALT);
	} catch(e) {
		return Promise.reject();
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});

}

let User = mongoose.model('User', UserSchema);

module.exports = {User};