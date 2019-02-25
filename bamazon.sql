DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", "599.99", "10");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tablet", "Electronics", "299.99", "15");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smart Phone", "Electronics", "49.99", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Japanese Ryoba Saw 180mm", "Tools", "34.80", "8");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Japanese Dozuki Hand Saw 6-in", "Tools", "24.85", "8");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Japanese Chisel Set", "Tools", "99.99", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Acoustic Guitar ", "Musical Instruments", "159.99", "6");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ukulele", "Musical Instruments", "59.99", "4");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Drum Set", "Musical Instruments", "259.99", "2");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Digital Piano", "Musical Instruments", "399.99", "3");
