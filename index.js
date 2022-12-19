const inquirer = require("inquirer");
const cTable = require('console.table');
const sql = require('./db/queries');
const ascii_text_generator = require('ascii-text-generator');

console.log(ascii_text_generator("Employee Tracker", "2"))


const promptActions = () => {
    console.log('\n');
    return inquirer.prompt([
        {
            type: 'list',
            name: 'request',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add department']


        }]).then(answer => {

            switch (answer.request) {

                case "View All Employees":
                    console.log('\n')
                    console.log("=========================");
                    console.log("****  ALL EMPLOYEES  ****");
                    console.log("=========================");
                    sql.getEmployees().then(([results]) => {
                        console.log('\n');
                        console.log(cTable.getTable(results));

                    });
                    break;
                case "Add Employee":
                    addEmployee();
                    break;

                case "View All Roles":
                    console.log('\n')
                    console.log("=========================");
                    console.log("****    ALL ROLES    ****");
                    console.log("=========================");
                    sql.getRoles().then(([results]) => {
                        console.log('\n');
                        console.log(cTable.getTable(results));
                        console.log('\n');
                        promptActions();
                    });

                    break;
                case "Add Role":
                    sql.getDepartment().then(([results]) => {
                        addRole(results);

                    });
                    break;

                case "View All Departments":
                    console.log('\n')
                    console.log("=========================");
                    console.log("**** ALL DEPARTMENTS ****");
                    console.log("=========================");
                    sql.getDepartment().then(([results]) => {
                        console.log('\n');
                        console.log(cTable.getTable(results));
                        console.log('\n');
                    });
                    break;
                case "Add department":
                    addDepartment();

                    break;

            }



        });
}


//ADDS EMPLOYEE 

const addEmployee = async () => {
  

    let roles = (await sql.getRoles())[0];
    let manager = (await sql.getManager())[0];
    console.log(manager);

     const empRole = [];
    for (let i = 0; i < roles.length; i++) {
        let value = { "name": roles[i].title, "value": roles[i].id }
        empRole.push(value);
    }

    const manName = [];
    for (let i = 0; i < manager.length; i++){
        let value1 = { "name": manager[i].fullname, "value": roles[i].id }
        manName.push(value1);
    }

    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee first name? ",
            name: "firstName",

        },
        {
            type: "input",
            message: "What is the employee last name? ",
            name: "lastName",

        },
        {
            type: 'list',
            name: 'empRole',
            message: 'What is the employees role?',
            choices: empRole


        },

        {
            type: 'list',
            name: 'manName',
            message: 'What is the employees manager?',
            choices: manName


        }

    ]).then(answer => {
        console.log(answer);
    })



}



//ADDS Department

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department? ",
            name: "managerName",

        }


    ]).then(answer => {
        console.log(answer);
        sql.addDepartment(answer.depaName);
    });

}



//ADDS ROLE

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
            message: 'Which department does the role belong to?',
            choices: departmentName


        }

    ]).then(answer => {
        console.log(answer);
        sql.addRole(answer.roleName, answer.roleSalary, answer.department);
    })

};





promptActions();
