const attribute_values = require("../models/attribute_values.model");

module.exports = {
  getAll: (req, res) => {
    attribute_values.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy attribute_values:", err);
        return res.status(500).send("Lỗi server khi lấy attribute_values!");
      }
      console.log("attribute_values:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    attribute_values.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy attribute_values theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy attribute_values theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy attribute_values với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const attribute_valuesData = req.body;
    attribute_values.insert(attribute_valuesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm attribute_values:", err);
        return res.status(500).send("Lỗi server khi thêm attribute_values!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${attribute_values.user_id} đã được thêm thành công.`,
        attribute_valuesdt: attribute_valuesData
      });
    });
  },

  update: (req, res) => {
    const attribute_valuesData = req.body;
    const id = req.params.id;
    attribute_values.update(id, attribute_valuesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật attribute_values:", err);
        return res.status(500).send("Lỗi server khi cập nhật attribute_values!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    attribute_values.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa attribute_values:", err);
        return res.status(500).send("Lỗi server khi xóa attribute_values!");
      }
    });
  },

};
