const express = require("express");
const router = express.Router();
const attribute_typesController = require("../controllers/attribute_types.controller");

router.get("/", attribute_typesController.getAll);
router.get("/:id", attribute_typesController.getById);
router.post("/", attribute_typesController.insert);
router.put("/:id", attribute_typesController.update);
router.delete("/:id", attribute_typesController.delete);
module.exports = router;

