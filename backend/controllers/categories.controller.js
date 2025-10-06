const categories = require("../models/categories.model");

module.exports = {
  getAll: (req, res) => {
    categories.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy categories:", err);
        return res.status(500).send("Lỗi server khi lấy category!");
      }
      // console.log("categories:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    categories.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy categories theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy category theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy categories với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const categoriesData = req.body;
    categories.insert(categoriesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm categories:", err);
        return res.status(500).send("Lỗi server khi thêm category!");
      }
      return res.status(200).json({
        message: `Category đã được thêm thành công.`,
        categoriesdt: categoriesData
      });
    });
  },

  update: (req, res) => {
    const categoriesData = req.body;
    const id = req.params.id;
    categories.update(id, categoriesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật categories:", err);
        return res.status(500).send("Lỗi server khi cập nhật category!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    categories.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa categories:", err);
        return res.status(500).send("Lỗi server khi xóa {id.ToLower()}!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });

    });
  },

};
