const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders.controller");

router.get("/", ordersController.getAll);
router.get("/:id", ordersController.getById);
router.post("/", ordersController.insert);
router.put("/:id", ordersController.update);
router.delete("/:id", ordersController.delete);
module.exports = router;

