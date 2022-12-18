const express = require('express');
const router = express.Router();
const knexConnection = require('../db-connection.js');
const {textQuery} = require('../queries/search_queries.js');

router.get('/', function(req, res, next) {
	knexConnection('recipe').select().orderBy('name')
		.then(
			data => res.json(data)
		)
		.catch(
			error => {
				console.log('error', error);
				res.status(500).send('Something went wrong!');
			}
		);
});

router.get('/search', function(req, res, next) {
	if (req.query.text) {
		textQuery(req.query.text, res);
	}
});

module.exports = router;
