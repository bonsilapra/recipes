const express = require('express');
const router = express.Router();
const knexConnection = require('../db-connection.js');

router.get('/', function(req, res, next) {
	const result = knexConnection.select().from('ingredient')
		.then(
			data => res.json(data)
		)
		.catch(
			error => console.log('error', error)
		);
});

module.exports = router;
