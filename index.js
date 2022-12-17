const inquirer = require("inquirer");
const cTable = require("console.table");
const sql = require('./db/queries');




const promtQuestions = () => {
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
                  
                
        }

    ]).then(answer => {
        console.log("maria")
        

    })
}

promtQuestions();