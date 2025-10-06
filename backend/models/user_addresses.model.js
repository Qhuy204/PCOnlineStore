const db = require("../common/db");

const user_addresses = function (user_addresses) {
	this.user_id = user_addresses.user_id;
	this.recipient_name = user_addresses.recipient_name;
	this.phone_number = user_addresses.phone_number;
	this.address = user_addresses.address;
	this.city = user_addresses.city;
	this.state = user_addresses.state;
	this.country = user_addresses.country;
	this.postal_code = user_addresses.postal_code;
	this.is_default = user_addresses.is_default;
	this.created_at = user_addresses.created_at;
	this.updated_at = user_addresses.updated_at;

};

// Lấy user_addresses theo ID
user_addresses.getById = (id, callback) => {
    const sqlString = "SELECT * FROM user_addresses WHERE user_id = ?";
    
    if (typeof callback === 'function') {
        db.query(sqlString, id, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    } 
    // Otherwise return a Promise
    else {
        return new Promise((resolve, reject) => {
            db.query(sqlString, id, (err, result) => {
                if (err) {
                    return reject(err);
                }
                
                resolve(result || []);
            });
        });
    }
};

// Lấy tất cả user_addresses
user_addresses.getAll = (callback) => {
    const sqlString = "SELECT * FROM user_addresses";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm user_addresses mới
user_addresses.insert = (newuser_addresses, callback) => {
    const sqlString = "INSERT INTO user_addresses SET ?";
    db.query(sqlString, newuser_addresses, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newuser_addresses });
    });
};

// Cập nhật thông tin user_addresses
user_addresses.update = (id, user_addressesData, callback) => {
    const sqlString = "UPDATE user_addresses SET ? WHERE address_id = ?";
    db.query(sqlString, [user_addressesData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

// Xóa user_addresses
user_addresses.delete = (id, callback) => {
    const sqlString = "DELETE FROM user_addresses WHERE address_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

module.exports = user_addresses;
