const category_attributes = require("../models/category_attributes.model");

module.exports = {
  getAll: (req, res) => {
    category_attributes.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy category_attributes:", err);
        return res.status(500).send("Lỗi server khi lấy category_attributes!");
      }
      // console.log("category_attributes:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    category_attributes.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy category_attributes theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy category_attributes theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy category_attributes với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const categoriesData = req.body;
    category_attributes.insert(categoriesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm category_attributes:", err);
        return res.status(500).send("Lỗi server khi thêm category_attributes!");
      }
      return res.status(200).json({
        message: `category_attributes đã được thêm thành công.`,
        categoriesdt: categoriesData
      });
    });
  },

  update: (req, res) => {
    const categoriesData = req.body;
    const id = req.params.id;
    category_attributes.update(id, categoriesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật category_attributes:", err);
        return res.status(500).send("Lỗi server khi cập nhật category_attributes!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    category_attributes.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa category_attributes:", err);
        return res.status(500).send("Lỗi server khi xóa {id.ToLower()}!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });

    });
  },

};
