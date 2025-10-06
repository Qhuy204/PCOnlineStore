const brand = require("../models/brand.model");

module.exports = {
  getAll: (req, res) => {
    brand.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy brand:", err);
        return res.status(500).send("Lỗi server khi lấy brand!");
      }
      // console.log("brand:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    brand.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy brand theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy brand theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy brand với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const brandData = req.body;
    brand.insert(brandData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm brand:", err);
        return res.status(500).send("Lỗi server khi thêm brand!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${brand.user_id} đã được thêm thành công.`,
        branddt: brandData
      });
    });
  },

  update: (req, res) => {
    const brandData = req.body;
    const id = req.params.id;
    brand.update(id, brandData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật brand:", err);
        return res.status(500).send("Lỗi server khi cập nhật brand!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    brand.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa brand:", err);
        return res.status(500).send("Lỗi server khi xóa brand!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });

    });
  },

};
