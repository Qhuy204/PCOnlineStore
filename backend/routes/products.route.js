const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

router.get("/", productsController.getAll);
router.get("/:id", productsController.getById);
router.post("/", productsController.insert);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.delete);
router.get("/list/bestselling", productsController.getBestSelling);
router.get("/list/attribute", productsController.getAllAttribute);
router.get("/list/variant", productsController.getAllVariant);

module.exports = router;

