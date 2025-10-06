const product_specifications = require("../models/product_specifications.model");

module.exports = {
  getAll: (req, res) => {
    product_specifications.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy product_specifications:", err);
        return res.status(500).send("Lỗi server khi lấy product_specifications!");
      }
      // console.log("product_specifications:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    product_specifications.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy product_specifications theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy product_specifications theo ID!");
      }
      if (!result || result.length === 0) {  // Kiểm tra result là undefined hoặc không có dữ liệu
        return res.status(404).send("Không tìm thấy product_specifications với ID: " + id);
      }
      res.json(result);
    });
  },
  

  insert: (req, res) => {
    const product_specificationsData = req.body;
    product_specifications.insert(product_specificationsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm product_specifications:", err);
        return res.status(500).send("Lỗi server khi thêm product_specifications!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${product_specifications.user_id} đã được thêm thành công.`,
        product_specificationsdt: product_specificationsData
      });
    });
  },

  update: (req, res) => {
    const product_specificationsData = req.body;
    const id = req.params.id;
    product_specifications.update(id, product_specificationsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật product_specifications:", err);
        return res.status(500).send("Lỗi server khi cập nhật product_specifications!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    product_specifications.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa product_specifications:", err);
        return res.status(500).send("Lỗi server khi xóa product_specifications!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });
    });
  },

};
