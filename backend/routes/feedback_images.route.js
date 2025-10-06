const express = require("express");
const router = express.Router();
const feedback_imagesController = require("../controllers/feedback_images.controller");

router.get("/", feedback_imagesController.getAll);
router.get("/:id", feedback_imagesController.getById);
router.post("/", feedback_imagesController.insert);
router.put("/:id", feedback_imagesController.update);
router.delete("/:id", feedback_imagesController.delete);
module.exports = router;

