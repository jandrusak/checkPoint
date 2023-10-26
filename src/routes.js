let express = require("express");


let router = express.Router();

let controller = require("./controller");

let authsMiddleware = require("../src/mwauths");

//users controllers:
router.get("/users", controller.getAllUsers);

router.get("/users/:id", controller.getUserById);

router.delete("/users/:id", controller.deleteUsers);

router.put("/users/:id", controller.updateUsers);



//products controllers: check the file locations
router.get("/Products", controller.getAllProducts);

router.get("/Products/:id", controller.getProductById);

router.post("/Products", controller.addProducts);

router.put("/Products/:id", controller.updateProduct);

router.delete("/Products/:id", controller.deleteProducts);



//cart controllers:
// router.delete("/Cart", authsMiddleware.checkJWT, controller.deleteProductFromCart);
router.delete("/Cart/:userId/products/:productId", authsMiddleware.checkJWT, controller.deleteProductFromCart);

router.get("/Carts", controller.getAllCarts);

router.post("/Cart", authsMiddleware.checkJWT, controller.addProductByUId)
router.get("/Cart", authsMiddleware.checkJWT, controller.getCartByUId)
// router.put("/Cart/:id", controller.updateCartByUId)


router.post("/addCart", authsMiddleware.checkJWT, controller.addToCartByProductId)

router.get("/Cart/:id", authsMiddleware.checkJWT, controller.getCartByUId);
//MUST HAVE MIDDLEWARE APPLIED
// router.put("/Products/:id", controller.deleteProductFromCart);




module.exports = router;