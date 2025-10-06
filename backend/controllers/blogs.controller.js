const blogs = require("../models/blogs.model");

module.exports = {
  getAll: (req, res) => {
    blogs.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy blogs:", err);
        return res.status(500).send("Lỗi server khi lấy blogs!");
      }
      // console.log("blogs:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    blogs.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy blogs theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy blogs theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy blogs với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const blogsData = req.body;
    blogs.insert(blogsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm blogs:", err);
        return res.status(500).send("Lỗi server khi thêm blogs!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${blogs.user_id} đã được thêm thành công.`,
        blogsdt: blogsData
      });
    });
  },

  update: (req, res) => {
    const blogsData = req.body;
    const id = req.params.id;
    blogs.update(id, blogsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật blogs:", err);
        return res.status(500).send("Lỗi server khi cập nhật blogs!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    blogs.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa blogs:", err);
        return res.status(500).send("Lỗi server khi xóa blogs!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });

    });
  },

  getBySlug: (req, res) => {
    const slug = req.params.slug;
    blogs.getBySlug(slug, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy blogs theo slug:", err);
        return res.status(500).send("Lỗi server khi lấy blogs theo slug!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy blogs với slug: " + slug);
      }
      res.json(result[0]); // Trả về 1 blog (nếu bạn dùng slug là duy nhất)
    });
  }
  

};
