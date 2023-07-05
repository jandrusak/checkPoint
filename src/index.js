let express = require("express"); 
let app = express();

require("dotenv").config();


app.use(express.json());
let routes = require("./routes");
// let db = require("./db");
// let pool = require("./db");
let db = require("./db");

app.use(routes);
let PORT = process.env.Port || 9005;
app.listen(PORT, function(){
    console.log("checkPoint app start on port", PORT);
});





console.log("hello world");

let mysql = require("mysql");
const { config } = require("dotenv");

let connection = mysql.createConnection({
    user: "admin", 
    password: "Jonathan#1", 
    host: "database-1.cdsewqdclf9z.us-east-2.rds.amazonaws.com",
    port: 3306,
    database: "checkpoint" 

    // database: "database-1"
    //not sure if that is the right default name
});

module.exports = config;
// module.exports = pool;

connection.connect();
//sned query in between start and end here

let sql = "select now();"


connection.query(sql, function (err, results){
    //what to do when query results come back? 
    if(err) {
        console.log("Running the query failed.", err);
    }   else {
        console.log("Te query was successful. => \n", results);
    }
});



connection.end();