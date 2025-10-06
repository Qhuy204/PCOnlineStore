const tags = require("../models/tags.model");

module.exports = {
  getAll: (req, res) => {
    tags.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy tags:", err);
        return res.status(500).send("Lỗi server khi lấy tags!");
      }
      // console.log("tags:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    tags.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy tags theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy tags theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy tags với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const tagsData = req.body;
    tags.insert(tagsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm tags:", err);
        return res.status(500).send("Lỗi server khi thêm tags!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${tags.user_id} đã được thêm thành công.`,
        tagsdt: tagsData
      });
    });
  },

  update: (req, res) => {
    const tagsData = req.body;
    const id = req.params.id;
    tags.update(id, tagsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật tags:", err);
        return res.status(500).send("Lỗi server khi cập nhật tags!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    tags.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa tags:", err);
        return res.status(500).send("Lỗi server khi xóa tags!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });

    });
  },

};
