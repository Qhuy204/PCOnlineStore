const express = require("express");
const router = express.Router();
const product_imagesController = require("../controllers/product_images.controller");

router.get("/", product_imagesController.getAll);
router.get("/:id", product_imagesController.getById);
router.post("/", product_imagesController.insert);
router.put("/:id", product_imagesController.update);
router.delete("/:id", product_imagesController.delete);
module.exports = router;

