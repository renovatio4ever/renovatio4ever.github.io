DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(100) NOT NULL ,
department_name VARCHAR(100)NOT NULL,
price FLOAT NOT NULL,
stock_quantity INT NOT NULL,
product_sales INT NOT NULL DEFAULT 0

);

CREATE TABLE departments(
department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(100) NOT NULL,
over_head_costs FLOAT

);

INSERT INTO products(product_name,department_name,price,stock_quantity,product_sales)
VALUES ("iPhone7-32G","Electronics",420,50,0),("iPhone7-128G","Electronics",615,50,0),
("iPhone8-64G","Electronics",790,20,0),("iPhone8-256G","Electronics",940,30,0),
("Dolce and Gabbana The One EDT for Men","ALL Beauty",47.89,250,0),("1 Million EDT for Men","ALL Beaty",64,200,0),
("Hugo Boss BOTTLED EDT for Men","ALL Beauty",80,150,0),("Guilty By Gucci EDT for Men","ALL Beauty",84,100,0)
,("Book:What I Know For Sure","Books",16.69,500,0),("Book:Own It","Books",9.60,700,0);


INSERT INTO departments(department_name,over_head_costs) VALUES ("Electronics",59000),
("ALL Beauty",41500),("Books",8500);
