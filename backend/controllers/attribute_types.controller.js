const attribute_types = require("../models/attribute_types.model");

module.exports = {
  getAll: (req, res) => {
    attribute_types.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy attribute_types:", err);
        return res.status(500).send("Lỗi server khi lấy attribute_type!");
      }
      console.log("attribute_types:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    attribute_types.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy attribute_types theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy attribute_type theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy attribute_types với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const attribute_typesData = req.body;
    attribute_types.insert(attribute_typesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm attribute_types:", err);
        return res.status(500).send("Lỗi server khi thêm attribute_type!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${attribute_types.user_id} đã được thêm thành công.`,
        attribute_typesdt: attribute_typesData
      });
    });
  },

  update: (req, res) => {
    const attribute_typesData = req.body;
    const id = req.params.id;
    attribute_types.update(id, attribute_typesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật attribute_types:", err);
        return res.status(500).send("Lỗi server khi cập nhật attribute_type!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    attribute_types.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa attribute_types:", err);
        return res.status(500).send("Lỗi server khi xóa attribute_types}!");
      }
    });
  },

};
