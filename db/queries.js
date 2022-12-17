const dbConnection = require('../lib/connection');
const cTable = require('console.table');

class dbQueries {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }




// dbConnection.query("SELECT * FROM students", function (err, results) {
//     console.log(results);


// });



    // getDepts() {
    //     return this.db
    //         .promise()
    //         .query(
    //             `SELECT * 
    // FROM department`
    //         );
    // }
 
    

};

function getDepartment() {
    return dbConnection.query(
        'SELECT * FROM department ORDER BY id ASC',
        function (err, results, fields) {
            console.log(cTable.getTable(results)); // results contains rows returned by server

        }
    )
};

getDepartment();


module.exports = {dbQueries};
