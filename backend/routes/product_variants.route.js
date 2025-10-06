const express = require("express");
const router = express.Router();
const product_variantsController = require("../controllers/product_variants.controller");

router.get("/", product_variantsController.getAll);
router.get("/:id", product_variantsController.getById);
router.post("/", product_variantsController.insert);
router.put("/:id", product_variantsController.update);
router.delete("/:id", product_variantsController.delete);
module.exports = router;

