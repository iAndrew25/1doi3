const {ObjectID} = require('mongodb');
const _ = require('lodash');
const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const {PASS_SALT} = require('../config.json');

const User = require('../models/user');
const {authenticate} = require('../middlewares/authenticate');

router.get('/me', authenticate, (req, res) => res.send(req.user));

router.post('/signup', (req, res) => {
	let {email, name} = req.body,
		decryptedPass = Math.random().toString(36).substr(2, 8),
		encryptedPass = bcrypt.hashSync(decryptedPass, 10);

		console.log(req.body);

	let newUser = new User({email, name, password: encryptedPass});
		newUser.save()
			.then(_ => newUser.generateAuthToken())
			.then(token => res.header('x-auth', token).send({success: true, message: 'Account has been created.'}))
			.catch(e => res.status(400).send(e));
});

router.post('/login', authenticate, (req, res) => {
	User.find()
		.then(doc => res.send({doc}))
		.catch(e => res.status(400).send(e));
});

router.get('/:id', authenticate, (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id)) return res.status(404).send();

	User.findById(id)
		.then(user => user ? res.send({user}) : Promise.reject())
		.catch(e => res.status(404).send(e))
});

module.exports = router;