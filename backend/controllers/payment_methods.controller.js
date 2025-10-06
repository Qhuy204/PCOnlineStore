const payment_methods = require("../models/payment_methods.model");

module.exports = {
  getAll: (req, res) => {
    payment_methods.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy payment_methods:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()}!");
      }
      // console.log("payment_methods:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    payment_methods.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy payment_methods theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy phương thức thanh toán theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy payment_methods với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const payment_methodsData = req.body;
    payment_methods.insert(payment_methodsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm payment_methods:", err);
        return res.status(500).send("Lỗi server khi thêm phương thức thanh toán!");
      }
      return res.status(200).json({
        message: `Phương thức thanh toán đã được thêm thành công.`,
        payment_methodsdt: payment_methodsData
      });
    });
  },

  update: (req, res) => {
    const payment_methodsData = req.body;
    const id = req.params.id;
    payment_methods.update(id, payment_methodsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật payment_methods:", err);
        return res.status(500).send("Lỗi server khi cập nhật payment_methods!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    payment_methods.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa payment_methods:", err);
        return res.status(500).send("Lỗi server khi xóa payment_methods!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });
    });
  },

};
