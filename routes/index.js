const express = require('express');
const router = express.Router();
const knexConnection = require('../db-connection.js');

router.get('/', function(req, res, next) {
	const result = knexConnection('recipe')
		.whereILike('name', `${req.query.query}%`)
		.union(function() {
			this.select('*')
				.from('recipe')
				.whereILike('name', `%${req.query.query}%`);
		})
		.then(
			data => res.json(data)
		)
		.catch(
			error => console.log('error', error)
		);
});

module.exports = router;
