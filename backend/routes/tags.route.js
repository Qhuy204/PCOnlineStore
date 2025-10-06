const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tags.controller");

router.get("/", tagsController.getAll);
router.get("/:id", tagsController.getById);
router.post("/", tagsController.insert);
router.put("/:id", tagsController.update);
router.delete("/:id", tagsController.delete);
module.exports = router;

