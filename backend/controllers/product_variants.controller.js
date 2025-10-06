const product_variants = require("../models/product_variants.model");

module.exports = {
  getAll: (req, res) => {
    product_variants.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy product_variants:", err);
        return res.status(500).send("Lỗi server khi lấy product_variants!");
      }
      // console.log("product_variants:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    product_variants.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy product_variants theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy product_variants theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy product_variants với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const product_variantsData = req.body;
    product_variants.insert(product_variantsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm product_variants:", err);
        return res.status(500).send("Lỗi server khi thêm product_variants!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${product_variants.user_id} đã được thêm thành công.`,
        product_variantsdt: product_variantsData
      });
    });
  },

  update: (req, res) => {
    const product_variantsData = req.body;
    const id = req.params.id;
    product_variants.update(id, product_variantsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật product_variants:", err);
        return res.status(500).send("Lỗi server khi cập nhật product_variants!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    product_variants.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa product_variants:", err);
        return res.status(500).send("Lỗi server khi xóa product_variants!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });

    });
  },

};
