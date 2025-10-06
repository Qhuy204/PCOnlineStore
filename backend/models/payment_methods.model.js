const db = require("../common/db");

const payment_methods = function (payment_methods) {
	this.payment_method_name = payment_methods.payment_method_name;
	this.description = payment_methods.description;

};

// Lấy payment_methods theo ID
payment_methods.getById = (id, callback) => {
    const sqlString = "SELECT * FROM payment_methods WHERE payment_method_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả payment_methods
payment_methods.getAll = (callback) => {
    const sqlString = "SELECT * FROM payment_methods";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm payment_methods mới
payment_methods.insert = (newpayment_methods, callback) => {
    const sqlString = "INSERT INTO payment_methods SET ?";
    db.query(sqlString, newpayment_methods, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newpayment_methods });
    });
};

// Cập nhật thông tin payment_methods
payment_methods.update = (id, payment_methodsData, callback) => {
    const sqlString = "UPDATE payment_methods SET ? WHERE payment_method_id = ?";
    db.query(sqlString, [payment_methodsData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa payment_methods
payment_methods.delete = (id, callback) => {
    const sqlString = "DELETE FROM payment_methods WHERE payment_method_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

module.exports = payment_methods;
