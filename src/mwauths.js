const { sign } = require("jsonwebtoken");
let jwt = require("jsonwebtoken");

let checkJWT = function (req, res, next) {
  //if request is valid, call next()
  //if not valid, send 401 on response

  let value = req.get("Authorization");
  let signedToken;

  if (value) {
    let parts = value.split(" ");
    if (parts[0] == "Bearer" && parts[1]) {
      signedToken = parts[1];
    } else {
      console.log("missing jwt bearer token");
      res.sendStatus(401);
    }
  }
  
  if (signedToken) {
    try {
      let decodedToken = jwt.verify(signedToken, process.env.Jwt_Secret);
      req.userToken = decodedToken;
      console.log(decodedToken)
      next();
    } catch (err) {
      console.log("failed to verify jwt", err);
      res.sendStatus(401);
    }
  }
};

module.exports = {
  checkJWT,
};