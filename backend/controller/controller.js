'use strict';

const db = require(__dirname + '/../lib/mysql');

exports.get_all_items = (req, res, next) => {
	db.query('SELECT * FROM items', [], (err, result) => {
		res.send(result);
	});
};