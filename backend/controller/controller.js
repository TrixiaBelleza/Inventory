'use strict';

const db = require(__dirname + '/../lib/mysql');

exports.get_all_items = (req, res, next) => {
	db.query('SELECT * FROM items', [], (err, result) => {
		res.send(result);
	});
};

exports.add_item = (req, res, next) => {
	const data = {
		name : req.body.data.name,
		qty : req.body.data.qty,
		amount : req.body.data.amount
	};
	const query_string = 'INSERT INTO items (name, qty, amount) VALUES (?, ?, ?)';
	db.query(query_string, [data.name, data.qty, data.amount], (err, result) => {
		if (err) console.log(err);
		else res.send(data);
	})
}

exports.delete_item = (req, res, next) => {
	console.log(req.body);
	const data = {
		id : req.body.data.id
	};
	const query_string = 'DELETE FROM items where id = ?';
	db.query(query_string, [data.id], (err,result) => {
		if(err) console.log(err);
		res.send(result);
	});
};

exports.edit_item = (req, res, next) => {
	console.log("req body data");
	console.log(req.body.data);
	const data = { 
		id : req.body.data.id,
		name : req.body.data.name,
		qty : req.body.data.qty,
		amount : req.body.data.amount
	};
	const query_string = 'UPDATE items SET name = ?, qty = ?, amount = ? where id = ?';
	db.query(query_string, [data.name, data.qty, data.amount, data.id], (err, result) => {
		if(err) console.log(err);
		res.send(result);
	});
};