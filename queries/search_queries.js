const knexConnection = require('../db-connection.js');

function textQuery(text, res) {
	knexConnection('recipe')
		.whereILike('name', `%${text}%`).orderBy('name')
		.then(
			data => {
				data.sort((a, b) => {
					const resultA = a.name.toLowerCase().indexOf(text);
					const resultB = b.name.toLowerCase().indexOf(text);

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
}

module.exports = {
	textQuery
};
