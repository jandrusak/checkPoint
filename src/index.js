let express = require("express"); 
let app = express();
let cors = require("cors");

app.use(cors())

require("dotenv").config();


app.use(express.json());
let routes = require("./routes");
// let db = require("./db");
// let pool = require("./db");
let db = require("./db");

app.use(routes);
let PORT = process.env.Port || 3306;
app.listen(PORT, function(){
    console.log("checkPoint app start on port", PORT);
});

let authRoutes = require("./authRoutes");
app.use(authRoutes);

let helloRoutes = require("./routes")


console.log("hello world");

