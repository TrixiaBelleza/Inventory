-- Create a database called “inventory", with table “items”, with columns (id, name, qty, amount)

drop database if exists inventory;
create database inventory;
use inventory;

create table items (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(200),
	qty INT,
	amount DECIMAL(16,2),
	constraint id_pk primary key(id)
);