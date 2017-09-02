const {ObjectID} = require('mongodb');
const _ = require('lodash');
const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const {PASS_SALT} = require('../config.json');

const {User, generateAuthToken} = require('../models/user');
const {authenticate} = require('../middlewares/authenticate');

router.get('/me', authenticate, (req, res) => res.send(req.user));

router.post('/signup', (req, res) => {
	let {email, name} = req.body,
		decryptedPass = Math.random().toString(36).substr(2, 8),
		encryptedPass = bcrypt.hashSync(decryptedPass, 10);

	let newUser = new User({email, name, password: encryptedPass});
		newUser.save()
			.then(_ => res.send({success: true, message: 'Account has been created. - ' + decryptedPass}))
			.catch(e => res.status(400).send({success: false, message: 'We could not create your account. Please try again later.'}));
});

router.post('/login', (req, res) => {
	let {email, password} = req.body;
	User.findOne({email})
		.then(user => {
			if(!user) return res.status(404).send({success: false, message: 'Username not found.'});
			if(!bcrypt.compareSync(password, user.password)) return res.status(401).send({success: false, message: 'Wrong password.'});

			res.header('x-auth', generateAuthToken(user)).send({success: true, message: 'Login successful.', user})
		})
		.catch(e => res.status(400).send({success: false, message: 'Login failed.'+ e}));
});

router.get('/:id', authenticate, (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id)) return res.status(404).send();

	User.findById(id)
		.then(user => user ? res.send({user}) : Promise.reject())
		.catch(e => res.status(404).send(e))
});

module.exports = router;