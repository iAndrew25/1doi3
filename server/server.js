let express = require('express');
let bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');
let _ = require('lodash');

let {mongoose} = require('./db/mongoose');
let {User} = require('./models/user');
let {authenticate} = require('./middlewares/authenticate');

let app = express();

app.use(bodyParser.json());

app.get('/users/me', authenticate, (req, res) => res.send(req.user));

app.post('/users', (req, res) => {
	let {email, name} = req.body;

	let newUser = new User({email, name});
		newUser.save()
			.then(_ => newUser.generateAuthToken())
			.then(token => res.header('x-auth', token).send(newUser))
			.catch(e => res.status(400).send(e));
});

app.get('/users', (req, res) => {
	User.find()
		.then(doc => res.send({doc}))
		.catch(e => res.status(400).send(e));
});

app.get('/users/:id', (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id)) return res.status(404).send();

	User.findById(id)
		.then(user => user ? res.send({user}) : Promise.reject())
		.catch(e => res.status(404).send(e))
});

app.delete('/users/:id', (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id)) return res.status(404).send('ID not valid.');

	User.remove({_id: id})
		.then(doc => doc ? res.send({doc}) : res.status(404).send('Couldnt find doc'))
		.catch(e => res.status(400).send(e));
});

app.patch('/users/:id', (req, res) => {
	let id = req.params.id,
		body = _.pick(req.body, ['email', 'name', 'active']);

	if(!ObjectID.isValid(id)) return res.status(404).send('ID not valid.');

	User.findByIdAndUpdate(id, {$set: body}, {new: true})
		.then(user => user ? res.send({user}) : res.status(404).send())
		.catch(e => res.status(400).send())
})

app.listen(3000, () => {
	console.log('Started!');
})