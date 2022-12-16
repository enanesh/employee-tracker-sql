const inquirer = require("inquirer");



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

    ])
}

promtQuestions();