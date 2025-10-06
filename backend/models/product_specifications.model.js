const db = require("../common/db");

const product_specifications = function (product_specifications) {
	this.product_id = product_specifications.product_id;
	this.spec_name = product_specifications.spec_name;
	this.spec_value = product_specifications.spec_value;
	this.display_order = product_specifications.display_order;

};

// Lấy product_specifications theo ID
product_specifications.getById = (id, callback) => {
    const sqlString = "SELECT * FROM product_specifications WHERE product_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả product_specifications
product_specifications.getAll = (callback) => {
    const sqlString = "SELECT * FROM product_specifications";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm product_specifications mới
product_specifications.insert = (newproduct_specifications, callback) => {
    const sqlString = "INSERT INTO product_specifications SET ?";
    db.query(sqlString, newproduct_specifications, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newproduct_specifications });
    });
};

// Cập nhật thông tin product_specifications
product_specifications.update = (id, product_specificationsData, callback) => {
    const sqlString = "UPDATE product_specifications SET ? WHERE spec_id = ?";
    db.query(sqlString, [product_specificationsData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa product_specifications
product_specifications.delete = (id, callback) => {
    const sqlString = "DELETE FROM product_specifications WHERE spec_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

module.exports = product_specifications;
