const express = require("express");
const router = express.Router();
const product_specificationsController = require("../controllers/product_specifications.controller");

router.get("/", product_specificationsController.getAll);
router.get("/:id", product_specificationsController.getById);
router.post("/", product_specificationsController.insert);
router.put("/:id", product_specificationsController.update);
router.delete("/:id", product_specificationsController.delete);
module.exports = router;

