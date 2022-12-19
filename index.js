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
                        promptActions();
                    });
                    break;
                
                case "Add Employee":
                    addEmployee();
                    console.log('\n');
;
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
                
                    case "Update Employee Role":
                    console.log('\n')
                    console.log("=========================");
                    console.log("**** UPDATE EMPLOYEE ****");
                    console.log("=========================");
                    sql.getEmployees().then(([results]) => {
                        updateRole(results);
                     
                       
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
  

    let roles = (await sql.getRoles())[0];//has to be 0 position 
    let manager = (await sql.getManager())[0];
   

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
        sql.addEmployee(answer.firstName, answer.lastName, answer.empRole, answer.manName);
        promptActions();
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
        promptActions();
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
        sql.addRole(answer.roleName, answer.roleSalary, answer.department);
        promptActions();
    })

};


//UPDATE ROLE 

const updateRole = async () => {


    let empToUp = (await sql.getEmployees())[0];//has to be 0 position 
   
    const upEmpName = [];
    for (let i = 0; i < empToUp.length; i++) {
        let value = { "name": empToUp[i].first_name + " " + empToUp[i].last_name, "value": empToUp[i].id }
        upEmpName.push(value);
    }

    let upRoles = (await sql.getRoles())[0];

    const upEmpRole = [];
    for (let i = 0; i < upRoles.length; i++) {
        let value = { "name": upRoles[i].title, "value": upRoles[i].id }
        upEmpRole.push(value);
    }



    inquirer.prompt([
     
        {
            type: 'list',
            name: 'upEmpName',
            message: "Which employe's role do you want to update?",
            choices: upEmpName

        },
        {
            type: 'list',
            name: 'upEmpRole',
            message: "Which role do you want to assign the selected employee?",
            choices: upEmpRole

        },

   

    ]).then(answer => {
       
        sql.updateEmployee(answer.upEmpRole, answer.upEmpName);
        promptActions();
    })



}




promptActions();
