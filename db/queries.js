const dbConnection = require('../lib/connection');
const cTable = require('console.table');


//ALL DEPARTMENTS TABLE
function getDepartment() {
    return dbConnection.promise().query(
        'SELECT * FROM department ORDER BY id ASC');
};

// getDepartment();


//ALL ROLES TABLE
function getRoles() {
    return dbConnection.promise().query(
        'SELECT role.id,role.title,department.department_name AS Department,CONCAT("$",FORMAT(role.salary,"C0") ) AS Salary  FROM role JOIN department ON role.department_id = department.id  ORDER BY id ASC  ');
};


//ALL EMPLOYEES TABLE


function getEmployees() {
    return dbConnection.query(
        'SELECT employee.id,employee.first_name,employee.last_name,department.department_name AS Deparment,CONCAT("$",FORMAT(role.salary,"C0")) AS salary,role.title,CONCAT(mgt.first_name," ", mgt.last_name) AS Manager FROM employee LEFT JOIN employee mgt ON employee.manager_id = mgt.id INNER JOIN role ON employee.role_id = role.id  LEFT JOIN  department ON role.department_id = department.id ORDER BY employee.id ASC ', function (err, results, fields) {
            console.log(cTable.getTable(results)); // results contains rows returned by server

        }
    )
};

// getEmployees()


function addRole(roleName,roleSalary,departmentId) {
    dbConnection.query(`INSERT INTO role(title,salary,department_id) VALUES ("${roleName}",${roleSalary},${departmentId})`);
}


module.exports = {  getRoles, getDepartment,addRole };
