const db = require("../common/db");

const feedbacks = function (feedbacks) {
	this.user_id = feedbacks.user_id;
	this.product_id = feedbacks.product_id;
	this.feedback_text = feedbacks.feedback_text;
	this.feedback_date = feedbacks.feedback_date;

};

// Lấy feedbacks theo ID
feedbacks.getById = (id, callback) => {
    const sqlString = "SELECT * FROM feedbacks WHERE feedback_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả feedbacks
feedbacks.getAll = (callback) => {
    const sqlString = "SELECT * FROM View_Check_Feedbacks";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm feedbacks mới
feedbacks.insert = (newfeedbacks, callback) => {
    const sqlString = "INSERT INTO feedbacks SET ?";
    db.query(sqlString, newfeedbacks, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newfeedbacks });
    });
};

// Cập nhật thông tin feedbacks
feedbacks.update = (id, feedbacksData, callback) => {
    const sqlString = "UPDATE feedbacks SET ? WHERE feedback_id = ?";
    db.query(sqlString, [feedbacksData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa feedbacks
feedbacks.delete = (id, callback) => {
    const sqlString = "DELETE FROM feedbacks WHERE feedback_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

module.exports = feedbacks;
