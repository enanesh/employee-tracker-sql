const inquirer = require("inquirer");
const cTable = require('console.table');
const sql = require('./db/queries');
const ascii_text_generator = require('ascii-text-generator');

console.log(ascii_text_generator("te amo", "2"))


const promptActions = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'request',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add department']


        }]).then(answer => {

            switch (answer.request) {
                case "View All Roles":
                    sql.getRoles().then(([results]) => {
                        console.log('\n');
                        console.log(cTable.getTable(results));
                    });
                    break;
                case "Add Role":
                    sql.getDepartment().then(([results]) => {
                        addRole(results);
                    });
                    break;

            }



        })
}


const addDepartment = () => {
    return inquirer.prompt([{
        type: "input",

    }])
}




/
const addRole = (departments) => {
    const departmentName = [];
    // Get an array with only department names
    for (let i = 0; i < departments.length; i++) {
        let value = { "name": departments[i].department_name, "value": departments[i].id }
        departmentName.push(value);
    }
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the role? ",
            name: "roleName",

        },
        {
            type: "input",
            message: "What is the salary of the role? ",
            name: "roleSalary",

        },
        {
            type: 'list',
            name: 'department',
            message: 'What would you like to do?',
            choices: departmentName


        }

    ]).then(answer => {
        console.log(answer);
        sql.addRole(answer.roleName,answer.roleSalary,answer.department);
    })

};

promptActions();
