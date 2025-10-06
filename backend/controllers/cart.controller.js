const cart = require("../models/cart.model");

module.exports = {
  getAll: (req, res) => {
    cart.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy cart:", err);
        return res.status(500).send("Lỗi server khi lấy cart!");
      }
      // console.log("cart:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    cart.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy cart theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy cart theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy cart với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const cartData = req.body;
    cart.insert(cartData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm cart:", err);
        return res.status(500).send("Lỗi server khi thêm cart!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${cart.user_id} đã được thêm thành công.`,
        cartdt: cartData
      });
    });
  },

  update: (req, res) => {
    const cartData = req.body;
    const id = req.params.id;
    cart.update(id, cartData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật cart:", err);
        return res.status(500).send("Lỗi server khi cập nhật cart!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    cart.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa cart:", err);
        return res.status(500).send("Lỗi server khi xóa cart!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });

    });
  },

};
