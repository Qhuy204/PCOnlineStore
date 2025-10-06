const db = require("../common/db");

const brand = function (brand) {
	this.brand_name = brand.brand_name;

};

// Lấy brand theo ID
brand.getById = (id, callback) => {
    const sqlString = "SELECT * FROM brand WHERE brand_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả brand
brand.getAll = (callback) => {
    const sqlString = "SELECT * FROM brand";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm brand mới
brand.insert = (newbrand, callback) => {
    const sqlString = "INSERT INTO brand SET ?";
    db.query(sqlString, newbrand, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newbrand });
    });
};

// Cập nhật thông tin brand
brand.update = (id, brandData, callback) => {
    const sqlString = "UPDATE brand SET ? WHERE brand_id = ?";
    db.query(sqlString, [brandData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa brand
brand.delete = (id, callback) => {
    const sqlString = "DELETE FROM brand WHERE brand_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

module.exports = brand;
