const express = require("express");
const router = express.Router();
const payment_methodsController = require("../controllers/payment_methods.controller");

router.get("/", payment_methodsController.getAll);
router.get("/:id", payment_methodsController.getById);
router.post("/", payment_methodsController.insert);
router.put("/:id", payment_methodsController.update);
router.delete("/:id", payment_methodsController.delete);
module.exports = router;

