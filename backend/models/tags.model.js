const db = require("../common/db");

const tags = function (tag) {
    this.tag_name = tags.tag_name;
};


// Lấy tags theo ID
tags.getById = (id, callback) => {
    const sqlString = "SELECT * FROM tags WHERE tag_name = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả tags
tags.getAll = (callback) => {
    const sqlString = "SELECT * FROM tags";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm tags mới
tags.insert = (newtags, callback) => {
    const sqlString = "INSERT INTO tags SET ?";
    db.query(sqlString, newtags, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newtags });
    });
};

// Cập nhật thông tin tags
tags.update = (id, tagsData, callback) => {
    const sqlString = "UPDATE tags SET ? WHERE tag_name = ?";
    db.query(sqlString, [tagsData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa tags
tags.delete = (id, callback) => {
    const sqlString = "DELETE FROM tags WHERE tag_name = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

module.exports = tags;
