const mysql = require("mysql2");
require('dotenv').config();


const dbname = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;

const conection = mysql.createConnection(

    {
        host: "localhost",
        // MySQL username,
        user: dbUser,
        // MySQL password
        password: dbPassword,
        database: dbname,
    


    },
    console.log(`Connected to the employeeTracker_db database.`)
);

module.exports = conection;