const db = require("../common/db");

const cart = function (cart) {
	this.user_id = cart.user_id;
	this.product_id = cart.product_id;
	this.quantity = cart.quantity;
	this.added_at = cart.added_at;
	this.is_active = cart.is_active;

};

// Lấy cart theo ID
cart.getById = (id, callback) => {
    const sqlString = "SELECT * FROM cart WHERE user_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả cart
cart.getAll = (callback) => {
    const sqlString = "SELECT * FROM cart";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm cart mới (hoặc cộng dồn nếu đã có)
cart.insert = (newCart, callback) => {
    const { user_id, product_id, variant_id, variant_sku, quantity } = newCart;

    const checkSql = `
        SELECT * FROM cart 
        WHERE user_id = ? AND product_id = ? AND variant_id = ? AND variant_sku = ? AND is_active = 1
    `;
    
    db.query(checkSql, [user_id, product_id, variant_id, variant_sku], (err, results) => {
        if (err) return callback(err);

        if (results.length > 0) {
            const existingCart = results[0];
            const updateSql = `
                UPDATE cart 
                SET quantity = quantity + ?, added_at = NOW()
                WHERE cart_id = ?
            `;
            db.query(updateSql, [quantity, existingCart.cart_id], (err, res) => {
                if (err) return callback(err);
                return callback(null, { message: "Cập nhật giỏ hàng thành công", cart_id: existingCart.cart_id });
            });
        } else {
            const insertSql = `
                INSERT INTO cart (user_id, product_id, variant_id, variant_sku, quantity)
                VALUES (?, ?, ?, ?, ?)
            `;
            db.query(insertSql, [user_id, product_id, variant_id, variant_sku, quantity], (err, res) => {
                if (err) return callback(err);
                return callback(null, { message: "Thêm vào giỏ hàng mới", cart_id: res.insertId });
            });
        }
    });
};


// Cập nhật thông tin cart
cart.update = (id, cartData, callback) => {
    const sqlString = "UPDATE cart SET ? WHERE cart_id = ?";
    db.query(sqlString, [cartData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa cart
cart.delete = (id, callback) => {
    const sqlString = "DELETE FROM cart WHERE cart_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

module.exports = cart;
