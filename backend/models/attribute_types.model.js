const db = require("../common/db");

const attribute_types = function (attribute_types) {
	this.type_name = attribute_types.type_name;
	this.display_order = attribute_types.display_order;

};

// Lấy attribute_types theo ID
attribute_types.getById = (id, callback) => {
    const sqlString = "SELECT * FROM attribute_types WHERE attribute_type_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả attribute_types
attribute_types.getAll = (callback) => {
    const sqlString = "SELECT * FROM attribute_types";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm attribute_types mới
attribute_types.insert = (newattribute_types, callback) => {
    const sqlString = "INSERT INTO attribute_types SET ?";
    db.query(sqlString, newattribute_types, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newattribute_types });
    });
};

// Cập nhật thông tin attribute_types
attribute_types.update = (id, attribute_typesData, callback) => {
    const sqlString = "UPDATE attribute_types SET ? WHERE attribute_type_id = ?";
    db.query(sqlString, [attribute_typesData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa attribute_types
attribute_types.delete = (id, callback) => {
    const sqlString = "DELETE FROM attribute_types WHERE attribute_type_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

module.exports = attribute_types;
