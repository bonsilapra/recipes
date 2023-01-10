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

router.get('/search', async function(req, res, next) {
	if (req.query.text) {
		try {
			const result = await textQuery(req.query.text);
			res.json(result);
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
});

module.exports = router;
