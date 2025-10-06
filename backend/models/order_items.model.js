const db = require("../common/db");

const order_items = function (order_items) {
	this.order_id = order_items.order_id;
	this.product_id = order_items.product_id;
	this.quantity = order_items.quantity;
	this.price_at_time = order_items.price_at_time;

};

// Lấy order_items theo ID
order_items.getById = (id, callback) => {
    const sqlString = "SELECT * FROM View_orderitems WHERE order_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả order_items
order_items.getAll = (callback) => {
    const sqlString = "SELECT * FROM order_items";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm order_items mới
order_items.insert = (neworder_items, callback) => {
    const sqlString = "INSERT INTO order_items SET ?";
    db.query(sqlString, neworder_items, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...neworder_items });
    });
};

// Cập nhật thông tin order_items
order_items.update = (id, order_itemsData, callback) => {
    const sqlString = "UPDATE order_items SET ? WHERE order_item_id = ?";
    db.query(sqlString, [order_itemsData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa order_items
order_items.delete = (id, callback) => {
    const sqlString = "DELETE FROM order_items WHERE order_item_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

module.exports = order_items;
