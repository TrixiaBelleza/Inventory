'use strict'

const router		= require(__dirname + '/router/router');
const express		= require('express');
const body_parser	= require('body-parser');

let start;
let handler;
let app;

start = () => {
	if(handler) {
		handler.close();
	}
	//Create an express app
	app = express();

	// Packages to make the app secured and stable
	app.use(require('method-override')());
	app.use(body_parser.urlencoded({extended: true}));
	app.use(body_parser.json());
	app.use(require('compression')());
	app.use(require('cors')());
	app.use(router(express.Router()));

	console.log("Server listening on port 3001"); //we'll use 3001 because port 3000 is reserved for frontend
	return app.listen(3001, "127.0.0.1");	
} 

handler = start();

module.exports = {
	app,
	start,
	handler
}