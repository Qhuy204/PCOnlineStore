const user_addresses = require("../models/user_addresses.model");

module.exports = {
  getAll: (req, res) => {
    user_addresses.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy user_addresses:", err);
        return res.status(500).send("Lỗi server khi lấy user_addresses!");
      }
      // console.log("user_addresses:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    user_addresses.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy user_addresses theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy user_addresses theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy user_addresses với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const user_addressesData = req.body;
    user_addresses.insert(user_addressesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm user_addresses:", err);
        return res.status(500).send("Lỗi server khi thêm user_addresses!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${user_addresses.user_id} đã được thêm thành công.`,
        user_addressesdt: user_addressesData
      });
    });
  },

  update: (req, res) => {
    const user_addressesData = req.body;
    const id = req.params.id;
    user_addresses.update(id, user_addressesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật user_addresses:", err);
        return res.status(500).send("Lỗi server khi cập nhật user_addresses!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    user_addresses.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa user_addresses:", err);
        return res.status(500).send("Lỗi server khi xóa user_addresses!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });
    });
  },

};
