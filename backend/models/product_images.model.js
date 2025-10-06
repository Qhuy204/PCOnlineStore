const db = require("../common/db");

const product_images = function (product_images) {
	this.product_id = product_images.product_id;
	this.image_url = product_images.image_url;
	this.is_primary = product_images.is_primary;
	this.created_at = product_images.created_at;

};

// Lấy product_images theo ID
product_images.getById = (id, callback) => {
    const sqlString = "SELECT * FROM product_images WHERE product_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả product_images
product_images.getAll = (callback) => {
    const sqlString = "SELECT * FROM product_images";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm product_images mới
product_images.insert = (newproduct_images, callback) => {
    const sqlString = "INSERT INTO product_images SET ?";
    db.query(sqlString, newproduct_images, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newproduct_images });
    });
};

// Cập nhật thông tin product_images
product_images.update = (id, product_imagesData, callback) => {
    const sqlString = "UPDATE product_images SET ? WHERE image_id = ?";
    db.query(sqlString, [product_imagesData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa product_images
product_images.delete = (id, callback) => {
    const sqlString = "DELETE FROM product_images WHERE image_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

module.exports = product_images;
