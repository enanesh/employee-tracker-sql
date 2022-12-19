const dbConnection = require('../lib/connection');
const cTable = require('console.table');


//ALL DEPARTMENTS TABLE
function getDepartment() {
    return dbConnection.promise().query(
        'SELECT * FROM department ORDER BY id ASC');
};



//ALL ROLES TABLE
function getRoles() {
    return dbConnection.promise().query(
        'SELECT role.id,role.title,department.department_name AS Department,CONCAT("$",FORMAT(role.salary,"C0") ) AS Salary  FROM role JOIN department ON role.department_id = department.id  ORDER BY id ASC  ');
};


//ALL EMPLOYEES TABLE


function getEmployees() {
    return dbConnection.promise().query(
        'SELECT employee.id,employee.first_name,employee.last_name,department.department_name AS Department,CONCAT("$",FORMAT(role.salary,"C0")) AS salary,role.title,CONCAT(mgt.first_name," ", mgt.last_name) AS Manager FROM employee LEFT JOIN employee mgt ON employee.manager_id = mgt.id INNER JOIN role ON employee.role_id = role.id  LEFT JOIN  department ON role.department_id = department.id ORDER BY employee.id ASC ', 
    );
};


//GETS MANAGER CONCAT NAME 

function getManager() {
    return dbConnection.promise().query(`SELECT id,CONCAT(first_name," ",last_name) AS fullname FROM employeeTracker_db.employee where manager_id IS NULL;`);


}




//ADDS NEW ROLE TO TABLE ROLE
function addRole(roleName,roleSalary,departmentId) {
    dbConnection.query(`INSERT INTO role(title,salary,department_id) VALUES ("${roleName}",${roleSalary},${departmentId})`);
}

//ADDS NEW DEPARTMENT 
function addDepartment(depaName) {
    dbConnection.query(`INSERT INTO department(department_name) VALUES ("${depaName}")`);
}

//ADDS NEW EMPLOYEE 
function addEmployee(firstName,lastName,empRole,manName) {
    dbConnection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${firstName}","${lastName}",${empRole},${manName}) `);
  
}

//UPDATE EMPLOYEE ROLE

function updateEmployee(upEmpRole, upEmpName) {
    dbConnection.query(`UPDATE employee SET role_id= ${upEmpRole} WHERE id=${upEmpName} `

    );
}

//UPDATE EMPLOYEE BY MANAGER




module.exports = { getRoles, getDepartment, addRole, getEmployees, addDepartment, getManager, addEmployee, updateEmployee };
