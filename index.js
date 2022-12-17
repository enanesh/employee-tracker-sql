const inquirer = require("inquirer");
const cTable = require('console.table');
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
        viewDepts();
        

    })
}


const viewDepts = () => {
    sql.getDepartment();
    .then(([rows]) => {
            console.log('\n');
            console.log(cTable.getTable(rows));
    });

        
}


promtQuestions();

console.log(sql);