const express = require("express");
const router = express.Router();
const order_itemsController = require("../controllers/order_items.controller");

router.get("/", order_itemsController.getAll);
router.get("/:id", order_itemsController.getById);
router.post("/", order_itemsController.insert);
router.put("/:id", order_itemsController.update);
router.delete("/:id", order_itemsController.delete);
module.exports = router;

