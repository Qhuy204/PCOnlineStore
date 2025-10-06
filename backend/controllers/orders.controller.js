const orders = require("../models/orders.model");

module.exports = {
  getAll: (req, res) => {
    orders.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy orders:", err);
        return res.status(500).send("Lỗi server khi lấy orders!");
      }
      // console.log("orders:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    orders.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy orders theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy orders theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy orders với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const ordersData = req.body;
    orders.insert(ordersData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm orders:", err);
        return res.status(500).send("Lỗi server khi thêm orders!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${orders.user_id} đã được thêm thành công.`,
        ordersdt: ordersData
      });
    });
  },

  update: (req, res) => {
    const ordersData = req.body;
    const id = req.params.id;
    orders.update(id, ordersData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật orders:", err);
        return res.status(500).send("Lỗi server khi cập nhật orders!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    orders.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa orders:", err);
        return res.status(500).send("Lỗi server khi xóa orders!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });

    });
  },

};
