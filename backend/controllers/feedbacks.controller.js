const feedbacks = require("../models/feedbacks.model");

module.exports = {
  getAll: (req, res) => {
    feedbacks.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy feedbacks:", err);
        return res.status(500).send("Lỗi server khi lấy feedback!");
      }
      // console.log("feedbacks:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    feedbacks.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy feedbacks theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy feedback theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy feedbacks với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const feedbacksData = req.body;
    feedbacks.insert(feedbacksData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm feedbacks:", err);
        return res.status(500).send("Lỗi server khi thêm feedback!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${feedbacks.user_id} đã được thêm thành công.`,
        feedbacksdt: feedbacksData
      });
    });
  },

  update: (req, res) => {
    const feedbacksData = req.body;
    const id = req.params.id;
    feedbacks.update(id, feedbacksData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật feedbacks:", err);
        return res.status(500).send("Lỗi server khi cập nhật feedback!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    feedbacks.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa feedbacks:", err);
        return res.status(500).send("Lỗi server khi xóa feedbacks!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });

    });
  },

};
