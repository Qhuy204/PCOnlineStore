const db = require("../common/db");

const feedback_images = function (feedback_images) {
	this.feedback_id = feedback_images.feedback_id;
	this.image_url = feedback_images.image_url;

};

// Lấy feedback_images theo ID
feedback_images.getById = (id, callback) => {
    const sqlString = "SELECT * FROM feedback_images WHERE feedback_image_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả feedback_images
feedback_images.getAll = (callback) => {
    const sqlString = "SELECT * FROM feedback_images";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm feedback_images mới
feedback_images.insert = (newfeedback_images, callback) => {
    const sqlString = "INSERT INTO feedback_images SET ?";
    db.query(sqlString, newfeedback_images, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newfeedback_images });
    });
};

// Cập nhật thông tin feedback_images
feedback_images.update = (id, feedback_imagesData, callback) => {
    const sqlString = "UPDATE feedback_images SET ? WHERE feedback_image_id = ?";
    db.query(sqlString, [feedback_imagesData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa feedback_images
feedback_images.delete = (id, callback) => {
    const sqlString = "DELETE FROM feedback_images WHERE feedback_image_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

module.exports = feedback_images;
