const express = require("express");
const router = express.Router();
const user_addressesController = require("../controllers/user_addresses.controller");

router.get("/", user_addressesController.getAll);
router.get("/:id", user_addressesController.getById);
router.post("/", user_addressesController.insert);
router.put("/:id", user_addressesController.update);
router.delete("/:id", user_addressesController.delete);
module.exports = router;

