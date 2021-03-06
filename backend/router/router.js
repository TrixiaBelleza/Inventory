'use strict';

const items_controller = require(__dirname + '/../controller/controller');

module.exports = (router) => {
	router.get('/view-all-items', items_controller.get_all_items);
	router.post('/add-item', items_controller.add_item);
	router.post('/delete-item', items_controller.delete_item);
	router.post('/edit-item', items_controller.edit_item);
	return router
}