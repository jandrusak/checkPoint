let db = require('../src/db.js'); 
let argon = require("argon2");
let jwt = require("jsonwebtoken");

//accpet the emaill and password
//store the email and hash

//get the email and password from the request
let registerUser = async function(req, res){
    // fetching from request
    let firstname = req.body.first_name;
    let lastname = req.body.last_name;
    let phone = req.body.phone;
    let email = req.body.email;
    let password = req.body.pwd;
    // let confirmPassword = req.body.confirmPassword;

    //make sure the email is truthy
    if(!email){
        res.status(400).json("email is required");
        return;
    }

    //convert the password to its hash
    let hash;
    try {
        hash = await argon.hash(password);
    }catch(err){
        //if for some reason the conversion fails, 
        //then log the error, and response with a 500 code
        console.log("Failed to hash the password", err);
        res.sendStatus(500);
        return;
    }

    //i ahve the hash and the email now. 
    //
    let sql = "insert into users (email, pwd, first_name, last_name, phone) values (?, ?, ?, ?, ?)";
    let params = [email, hash, firstname, lastname, phone];
    // putting into database 

    db.query(sql, params, function(err, results){
        if(err){
            console.log("Failed to register a user", err);
            res.sendStatus(500);
        }   else {
            res.sendStatus(204);
        }
    })
};

let loginUser = function(req, res){
    //1. get the email and password from the request. 
    // 2. generate the hash from the password (skip for now, bc the library will compare password to hash)
    //3. fetch the stored hash for the email from the database
    //4. if the user exists in the data base check the stored hash against the generate hash (for today against presented password)
    //      to decide if the login failed or not. 
    //5. if the user does not exist, fail the login

    //1.
    let email = req.body.email; 
    let password = req.body.pwd;
   
    let sql = "select user_id, pwd from users where email = ?";
    let params = [email];

    //3.
    db.query(sql, params, async function(err, results){
        let storedHash;
        let storedId;
        if(err){
            console.log("failed to fetch for user", err);
        } else if (results.length > 1) {
            console.log("Returned more than 1 user for the email", email);
        } else if (results.length ==1) {
            storedHash = results[0].pwd;
            storedId = results[0].user_id;
        } else if (results.length == 0) {
            console.log("did not find user for email", email);
        }
        
        try {
        let pass = await argon.verify(storedHash, password);
        if (pass){
            // res.sendStatus(204); deleted since adding the token
            //(new part that is being added to just allowing access and willl now generate a token and send back)
            let token = {
                id: storedId,
                email: email
            };
            //token good for 5 days
            let signedToken = jwt.sign(token, process.env.Jwt_Secret, {expiresIn: 432000})
            res.json(signedToken);

        } else {
            res.sendStatus(401);
        }
    }   catch (err) {
        console.log("failed when verifying the hash", err);
        res.sendStatus(401);
    }
    });
};

module.exports = {
    registerUser, 
    loginUser
}