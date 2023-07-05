let express = require("express");

let router = express.Router();

let controller = require("./controller");

router.get("/checkpoint", controller.listEntries);

router.get("/checkpoint/:id", controller.getEntries);

router.delete("/checkpoint/:id", controller.deleteEntries);

router.post("/checkpoint", controller.addEntries);

router.put("/checkpoint/:id", controller.updateEntries);

module.exports = router;