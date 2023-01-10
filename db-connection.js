const knexConnection = require('knex')({
	client: 'pg',
	connection: 'postgresql://postgres:mysecretpassword@localhost:5432/recipes'
});

module.exports = knexConnection
