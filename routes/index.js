const express = require('express');
const router = express.Router();
const knexConnection = require('../db-connection.js')
/* GET home page. */
router.get('/', function(req, res, next) {
    const result = knexConnection.select('name', 'source').from('recipe')
        .then(
            data => res.json(data)
        )
        .catch(
            error => console.log('error', error)
        )
    
});

module.exports = router;
