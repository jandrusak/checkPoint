let express = require("express");

let router = express.Router();

let controller = require("./controller");

let authsMiddleware = require("../src/mwauths");

// router.get("/checkpoint", controller.listUsers);

router.get("/checkpoint/:id", controller.getUsers);

router.delete("/checkpoint/:id", controller.deleteUsers);

router.post("/checkpoint", controller.addProducts);

// router.put("/checkpoint/:id", controller.updateUsers);



//adding middleware
router.post("/hello", function(req,res){
    res.json("Hello there!");
})

//protected route and require auth: get jwt and validate
//middleware should be applied to all applicable routes
// router.post("/welcomeBack", authsMiddleware.checkJWT, function(req,res){
//     res.json("wellcome back!");
// })




module.exports = router;