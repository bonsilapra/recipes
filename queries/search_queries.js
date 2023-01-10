const knexConnection = require('../db-connection.js');

async function textQuery(text) {
	return await knexConnection('recipe')
		.whereILike('name', `%${text}%`).orderBy('name')
		.then(
			data => {
				data.sort((a, b) => {
					const resultA = a.name.toLowerCase().indexOf(text);
					const resultB = b.name.toLowerCase().indexOf(text);

					return resultA - resultB;
				});

				return data;
			}
		)
		.catch(
			error => {
				console.log('error', error);
				throw new Error('Something went wrong!');
			}
		);
}

module.exports = {
	textQuery
};
