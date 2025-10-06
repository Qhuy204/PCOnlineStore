const feedback_images = require("../models/feedback_images.model");

module.exports = {
  getAll: (req, res) => {
    feedback_images.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy feedback_images:", err);
        return res.status(500).send("Lỗi server khi lấy feedback_images!");
      }
      // console.log("feedback_images:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    feedback_images.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy feedback_images theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy feedback_images theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy feedback_images với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const feedback_imagesData = req.body;
    feedback_images.insert(feedback_imagesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm feedback_images:", err);
        return res.status(500).send("Lỗi server khi thêm feedback_images!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${feedback_images.user_id} đã được thêm thành công.`,
        feedback_imagesdt: feedback_imagesData
      });
    });
  },

  update: (req, res) => {
    const feedback_imagesData = req.body;
    const id = req.params.id;
    feedback_images.update(id, feedback_imagesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật feedback_images:", err);
        return res.status(500).send("Lỗi server khi cập nhật feedback_images!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    feedback_images.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa feedback_images:", err);
        return res.status(500).send("Lỗi server khi xóa feedback_images!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });

    });
  },

};
