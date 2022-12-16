DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;


--CREATES DEPARTMENT TABLE
CREATE TABLE department(
    id INT NOT NULL ,
    department_name VARCHAR(30) NOT NULL,
    --KEYS
    PRIMARY KEY (id)
);


--CREATES R0LE TABLE

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT ,
    tittle VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    --KEYS
    PRIMARY KEY (id)
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);


--CREATES EMPLOYEE TABLE 

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT ,
    first_name VARCHAR(30), 
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT REFERENCES employee(id),
    --KEYS
    PRIMARY KEY (id),
    FOREIGN KEY (role_id),
    REFERENCES role(id)

);

