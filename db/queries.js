const dbConnection = require('../lib/connection');


module.exports = class dbQueries {
    constructor(db) {
        this.db = db;
    }

};


// dbConnection.query("SELECT * FROM department", function (err, results) {
//     console.log(results);
// });

function getDepartments(){
    return dbConnection.query(
    'SELECT * FROM department',
    function (err, results, fields) {
        console.log(results); // results contains rows returned by server
        
    }
);
};

getDepartments();