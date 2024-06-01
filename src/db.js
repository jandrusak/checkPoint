let mysql = require("mysql");
const { config } = require("dotenv");

let connection = mysql.createPool({
    user: process.env.Db_Username, 
    password: process.env.Db_Password, 
    host: process.env.Db_Host,
    port: process.env.DB_PORT, 
    database: process.env.Db_Name

});

let sql = "select now();"

connection.query(sql, function (err, results){
    //what to do when query results come back? 
    if(err) {
        console.log("Running the query failed.", err);
    }   else {
        console.log("The query was successful. => \n", results);
    }
});

module.exports = connection;