const express = require("express");
const router = express.Router();
const attribute_valuesController = require("../controllers/attribute_values.controller");

router.get("/", attribute_valuesController.getAll);
router.get("/:id", attribute_valuesController.getById);
router.post("/", attribute_valuesController.insert);
router.put("/:id", attribute_valuesController.update);
router.delete("/:id", attribute_valuesController.delete);
module.exports = router;

