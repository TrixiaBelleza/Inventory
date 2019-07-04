'use strict';

const items_controller = require(__dirname + '/../controller/controller');

module.exports = (router) => {
	router.get('/view-all-items', items_controller.get_all_items);
	return router
}