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
VALUES ("Laptop", "Electronics", "599.99", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tablet", "Electronics", "299.99", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smart Phone", "Electronics", "49.99", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Japanese Ryoba Saw 180mm", "Tools", "34.80", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Japanese Dozuki Hand Saw", "Tools", "24.85", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Japanese Chisel Set", "Tools", "99.99", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Acoustic Guitar ", "Musical Instruments", "159.99", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ukulele", "Musical Instruments", "59.99", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Drum Set", "Musical Instruments", "259.99", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Digital Piano", "Musical Instruments", "399.99", "20");
