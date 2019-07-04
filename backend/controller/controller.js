'use strict';

const db = require(__dirname + '/../lib/mysql');

exports.get_all_items = (req, res, next) => {
	db.query('SELECT * FROM items', [], (err, result) => {
		res.send(result);
	});
};

exports.add_item = (req, res, next) => {
	const data = {
		name : req.body.name,
		qty : req.body.qty,
		amount : req.body.amount
	};
	const query_string = 'INSERT INTO items (name, qty, amount) VALUES (?, ?, ?)';
	db.query(query_string, [data.name, data.qty, data.amount], (err, result) => {
		if (err) console.log(err);
		else res.send(data);
	})
}