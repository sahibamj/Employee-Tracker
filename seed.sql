DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department (
id INTEGER NOT NULL AUTO_INCREMENT,
dept_name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);


CREATE TABLE role (
id INTEGER NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL (7,2),
department_id INTEGER NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INTEGER NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO department (dept_name)
VALUES ("Marketing"),("Advertising"),("Operations"),("Finance"),("Technology"),("Janitor");



INSERT INTO role (title, salary, department_id)
VALUES ("Operations Manager", 80000.92, 789),("HOD", 12345.56, 09876),("Executive head", 12345.67, 4563),("Finance head", 9876.54, 60413);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nicole", "Simpson", 123, 456),("Abhay", "Jane", 0987, 12345),("Tamie", "Kelson", 50513, 59683),("Kabir", "Anand", 42367, 7231097);

SELECT manager_id, salary, first_name, last_name, title, dept_name
FROM role
INNER JOIN employee
ON role.id = employee.id
INNER JOIN department
ON department.id = employee.id;

