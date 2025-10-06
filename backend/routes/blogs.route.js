const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogs.controller");

router.get("/", blogsController.getAll);
router.get("/slug/:slug", blogsController.getBySlug); 
router.get("/:id", blogsController.getById);
router.post("/", blogsController.insert);
router.put("/:id", blogsController.update);
router.delete("/:id", blogsController.delete);

module.exports = router;
