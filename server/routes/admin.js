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