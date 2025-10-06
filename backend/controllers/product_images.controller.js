const product_images = require("../models/product_images.model");

module.exports = {
  getAll: (req, res) => {
    product_images.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy product_images:", err);
        return res.status(500).send("Lỗi server khi lấy product_images!");
      }
      // console.log("product_images:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    product_images.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy product_images theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy product_images theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy product_images với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const product_imagesData = req.body;
    product_images.insert(product_imagesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm product_images:", err);
        return res.status(500).send("Lỗi server khi thêm product_images!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${product_images.user_id} đã được thêm thành công.`,
        product_imagesdt: product_imagesData
      });
    });
  },

  update: (req, res) => {
    const product_imagesData = req.body;
    const id = req.params.id;
    product_images.update(id, product_imagesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật product_images:", err);
        return res.status(500).send("Lỗi server khi cập nhật product_images!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    product_images.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa product_images:", err);
        return res.status(500).send("Lỗi server khi xóa product_images!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });

    });
  },

};
