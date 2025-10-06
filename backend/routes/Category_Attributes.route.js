const express = require("express");
const router = express.Router();
const category_attributesController = require("../controllers/Category_Attributes.controller");

router.get("/", category_attributesController.getAll);
router.get("/:id", category_attributesController.getById);
router.post("/", category_attributesController.insert);
router.put("/:id", category_attributesController.update);
router.delete("/:id", category_attributesController.delete);
module.exports = router;

