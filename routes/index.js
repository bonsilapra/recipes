const express = require('express');
const router = express.Router();
const knexConnection = require('../db-connection.js');

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
	knexConnection('recipe')
		.whereILike('name', `%${req.query.text}%`).orderBy('name')
		.then(
			data => {
				data.sort((a, b) => {
					const resultA = a.name.toLowerCase().indexOf(req.query.text);
					const resultB = b.name.toLowerCase().indexOf(req.query.text);

					return resultA - resultB;
				});
				res.json(data);
			}
		)
		.catch(
			error => {
				console.log('error', error);
				res.status(500).send('Something went wrong!');
			}
		);
});

module.exports = router;
