const db = require("../common/db");

const blogs = function (blog) {
    this.blog_title = blog.blog_title;
    this.blog_slug = blog.blog_slug;
    this.blog_thumbnail_url = blog.blog_thumbnail_url;
    this.blog_description = blog.blog_description;
    this.blog_content = blog.blog_content;
    this.blog_author_name = blog.blog_author_name;
    this.category = blog.category;
    this.tags = blog.tags;
    this.published_at = blog.published_at || new Date();
    this.updated_at = blog.updated_at || new Date();
    this.views = blog.views || 0;
    this.is_published = blog.is_published !== undefined ? blog.is_published : true;
};


// Lấy blogs theo ID
blogs.getById = (id, callback) => {
    const sqlString = "SELECT * FROM blogs WHERE blog_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả blogs
blogs.getAll = (callback) => {
    const sqlString = "SELECT * FROM blogs";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm blogs mới
blogs.insert = (newblogs, callback) => {
    const sqlString = "INSERT INTO blogs SET ?";
    db.query(sqlString, newblogs, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newblogs });
    });
};

// Cập nhật thông tin blogs
blogs.update = (id, blogsData, callback) => {
    const sqlString = "UPDATE blogs SET ? WHERE blog_id = ?";
    db.query(sqlString, [blogsData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa blogs
blogs.delete = (id, callback) => {
    const sqlString = "DELETE FROM blogs WHERE blog_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

// Lấy blog theo slug
blogs.getBySlug = (slug, callback) => {
    const sqlString = "SELECT * FROM blogs WHERE blog_slug = ?";
    db.query(sqlString, [slug], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};


module.exports = blogs;
