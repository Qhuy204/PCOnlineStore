const express = require("express");
const router = express.Router();
const variant_attribute_valuesController = require("../controllers/variant_attribute_values.controller");

// Get all variant attribute values
router.get("/", variant_attribute_valuesController.getAll);

// Get variant attribute values by variant ID and attribute value ID
router.get("/:variantId", variant_attribute_valuesController.getById);

// Create new variant attribute values
router.post("/", variant_attribute_valuesController.insert);

// Update existing variant attribute values
router.put("/:variantId", variant_attribute_valuesController.update);

// Delete variant attribute values
router.delete("/:variantId", variant_attribute_valuesController.delete);

module.exports = router;