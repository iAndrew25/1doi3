const {ObjectID} = require('mongodb');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

//let {mongoose} = require('../database/mongoose');
let {User} = require('../models/user');
let {authenticate} = require('../middlewares/authenticate');

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
});

router.get('/me', authenticate, (req, res) => res.send(req.user));

router.post('/', (req, res) => {
	console.log(req.body);
	let {email, name} = req.body;

	let newUser = new User({email, name});
		newUser.save()
			.then(_ => newUser.generateAuthToken())
			.then(token => res.header('x-auth', token).send(newUser))
			.catch(e => res.status(400).send(e));

	console.log('here');
});

router.get('/', (req, res) => {
	User.find()
		.then(doc => res.send({doc}))
		.catch(e => res.status(400).send(e));
});

router.get('/:id', (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id)) return res.status(404).send();

	User.findById(id)
		.then(user => user ? res.send({user}) : Promise.reject())
		.catch(e => res.status(404).send(e))
});

router.delete('/:id', (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id)) return res.status(404).send('ID not valid.');

	User.remove({_id: id})
		.then(doc => doc ? res.send({doc}) : res.status(404).send('Couldnt find doc'))
		.catch(e => res.status(400).send(e));
});

router.patch('/:id', (req, res) => {
	let id = req.params.id,
		body = _.pick(req.body, ['email', 'name', 'active']);

	if(!ObjectID.isValid(id)) return res.status(404).send('ID not valid.');

	User.findByIdAndUpdate(id, {$set: body}, {new: true})
		.then(user => user ? res.send({user}) : res.status(404).send())
		.catch(e => res.status(400).send())
});

module.exports = router;