const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.post("/", usersController.insert);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.post('/register', usersController.register);
router.get('/check-username/:username', usersController.checkUsername);
router.get("/list/admin", usersController.getNhanvien);
router.get('/list/orders/:id', usersController.getOrdersByUserID);
module.exports = router;
