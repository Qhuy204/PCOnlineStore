const db = require("../common/db");

const attribute_values = function (attribute_values) {
	this.attribute_type_id = attribute_values.attribute_type_id;
	this.value_name = attribute_values.value_name;

};

// Lấy attribute_values theo ID
attribute_values.getById = (id, callback) => {
    const sqlString = "SELECT * FROM attribute_values WHERE attribute_value_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả attribute_values
attribute_values.getAll = (callback) => {
    const sqlString = "SELECT * FROM attribute_values";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm attribute_values mới
attribute_values.insert = (newattribute_values, callback) => {
    const sqlString = "INSERT INTO attribute_values SET ?";
    db.query(sqlString, newattribute_values, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newattribute_values });
    });
};

// Cập nhật thông tin attribute_values
attribute_values.update = (id, attribute_valuesData, callback) => {
    const sqlString = "UPDATE attribute_values SET ? WHERE attribute_value_id = ?";
    db.query(sqlString, [attribute_valuesData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa attribute_values
attribute_values.delete = (id, callback) => {
    const sqlString = "DELETE FROM attribute_values WHERE attribute_value_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

module.exports = attribute_values;
