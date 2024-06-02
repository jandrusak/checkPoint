let express = require("express");
let router = express.Router();
let controller = require("./controller");
let authsMiddleware = require("../src/mwauths");

//users controllers:
router.get("/users", controller.getAllUsers);
router.get("/users/:id", controller.getUserById);
router.delete("/users/:id", controller.deleteUsers);
router.put("/users/:id", controller.updateUsers);

//products controllers: 
router.get("/Products", controller.getAllProducts);
router.get("/Products/:id", controller.getProductById);
router.post("/Products", controller.addProducts);
router.put("/Products/:id", controller.updateProduct);
router.delete("/Products/:id", controller.deleteProducts);

//cart controllers:
// router.delete("/Cart", authsMiddleware.checkJWT, controller.deleteProductFromCart);
router.delete("/Cart/:product_id", authsMiddleware.checkJWT, controller.deleteProductFromCart);
router.get("/Carts", controller.getAllCarts);
router.post("/Cart", controller.addProductByUId)
router.get("/Cart", controller.getCartByUId)
// router.put("/Cart/:id", controller.updateCartByUId)
router.post("/addCart", controller.addToCartByProductId)
router.get("/Cart/:id", controller.getCartByUId);
//MUST HAVE MIDDLEWARE APPLIED
// router.put("/Products/:id", controller.deleteProductFromCart);



// payment controllers (authentication required)
router.post("/create-order", authsMiddleware.checkJWT, controller.createOrder);
router.post("/capture-order", authsMiddleware.checkJWT, controller.captureOrder);


module.exports = router;