const db = require("../common/db");

const category_attributes = function (category_attributes) {
    this.category_name = category_attributes.category_name;
    this.description = category_attributes.description;

};

// Lấy category_attributes theo ID
category_attributes.getById = (id, callback) => {
    const sqlString = "SELECT * FROM category_attributes WHERE category_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả category_attributes
category_attributes.getAll = (callback) => {
    const sqlString = "SELECT * FROM category_attributes";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm category_attributes mới
category_attributes.insert = (newcategories, callback) => {
    const sqlString = "INSERT INTO category_attributes SET ?";
    db.query(sqlString, newcategories, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newcategories });
    });
};

// Cập nhật thông tin category_attributes
category_attributes.update = (id, category_attributesData, callback) => {
    const sqlString = "UPDATE category_attributes SET ? WHERE category_id = ?";
    db.query(sqlString, [category_attributesData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa category_attributes
category_attributes.delete = (id, callback) => {
    const sqlString = "DELETE FROM category_attributes WHERE category_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

module.exports = category_attributes;
