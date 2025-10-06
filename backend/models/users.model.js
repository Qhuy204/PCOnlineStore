const db = require("../common/db");
const md5 = require('md5');

const users = function (users) {
	this.username = users.username;
	this.email = users.email;
	this.password = users.password;
	this.full_name = users.full_name;
	this.phone_number = users.phone_number;
	this.registration_date = users.registration_date;
	this.last_login = users.last_login;
	this.is_admin = users.is_admin;
	this.email_verified = users.email_verified;

};

// Lấy users theo ID
users.getById = (id, callback) => {
    const sqlString = "SELECT * FROM users WHERE user_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Lấy tất cả users
users.getAll = (callback) => {
    const sqlString = "SELECT * FROM View_Customer_Order_Summary";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm users mới
users.insert = (userData, callback) => {
    const query = `
      INSERT INTO Users 
      (username, email, password, full_name, phone_number, 
       registration_date, last_login, is_admin, email_verified) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const values = [
      userData.username,
      userData.email,
      userData.password,
      userData.full_name,
      userData.phone_number,
      userData.registration_date || new Date(),
      userData.last_login || new Date(),
      userData.is_admin || false,
      userData.email_verified || false
    ];
  
    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  },

users.update = (id, usersData, callback) => {
  // Mã hóa mật khẩu nếu có
  if (usersData.password) {
      usersData.password = md5(usersData.password); // Mã hóa mật khẩu
  }

  const sqlString = "UPDATE users SET ? WHERE user_id = ?";
  db.query(sqlString, [usersData, id], (err, res) => {
      if (err) {
          return callback(err);
      }
      return callback(null, res);
  });
};

// Xóa users
users.delete = (id, callback) => {
  const sqlString = "DELETE FROM users WHERE user_id = ?";
  db.query(sqlString, id, (err, result) => {
      if (err) {
          return callback(err);
      }
      // Gọi callback với kết quả thành công
      return callback(null, result);
  });
};

// Lấy tất cả nhân viên
users.getNhanvien = (isAdmin, callback) => {
    const sqlString = "SELECT * FROM view_nhanvien WHERE is_admin = ?";
    
    db.query(sqlString, [isAdmin], (err, result) => {
      if (err) {
        console.error("Lỗi SQL:", err);  // In lỗi SQL ra console để dễ debug
        return callback(err);
      }
  
      if (!result) {
        return callback(null, []);  // Trả về mảng rỗng nếu không có dữ liệu
      }
  
      callback(null, result);  // Trả về kết quả truy vấn nếu thành công
    });
  };
  
users.getlistOrders = (callback) => {
    const sqlString = "SELECT * FROM View_Customer_Order_Summary";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

users.getOrdersByUserID = (userID, callback) => {
  const sqlString = "CALL GetUserOrders(?)";  
  db.query(sqlString, [userID], (err, result) => { 
    if (err) {
        // Nếu server trả về mã lỗi 404, trả về mảng rỗng thay vì lỗi
        if (err.code === 'ER_NOT_FOUND') {
            return callback(null, []);  // Trả về mảng rỗng
        }
        return callback(err);  // Nếu lỗi khác, trả về lỗi ban đầu
    }
    
    // Xử lý kết quả trả về từ query
    const orders = result[0]; // Giả sử kết quả trả về là mảng các đơn hàng
    
    // Kiểm tra nếu không có đơn hàng nào, trả về mảng rỗng
    if (!orders || orders.length === 0) {
      return callback(null, []);  // Trả về mảng rỗng nếu không có đơn hàng
    }

    // Khởi tạo một đối tượng để chứa dữ liệu theo định dạng mong muốn
    const formattedOrders = {};

    orders.forEach(order => {
        // Nếu order_id chưa có trong formattedOrders, tạo một mục mới
        if (!formattedOrders[order.order_id]) {
            formattedOrders[order.order_id] = {
                order_id: order.order_id,
                user_id: order.user_id,
                guest_name: order.guest_name,
                guest_email: order.guest_email,
                guest_phone: order.guest_phone,
                total_amount: order.total_amount,
                order_date: order.order_date,
                status: order.status,
                shipping_address: order.shipping_address,
                payment_status: order.payment_status,
                payment_method_name: order.payment_method_name,
                products: []
            };
        }

        // Thêm sản phẩm vào danh sách sản phẩm của đơn hàng
        formattedOrders[order.order_id].products.push({
            variant_sku: order.variant_sku,
            product_name: order.product_name,
            model: order.model,
            brand_name: order.brand_name,
            price: order.price,
            quantity: order.quantity,
            product_image: order.product_image
        });
    });

    // Chuyển đổi kết quả thành mảng, mỗi phần tử là một đơn hàng
    const resultArray = Object.values(formattedOrders);
    
    // Gọi callback với kết quả đã được format
    callback(null, resultArray);
  });
};


users.login = (user,pass, callback) => {
	pass=md5(pass);
	const sqlString = "SELECT * FROM users WHERE username = '"+user+"' and password = '"+pass+"'";
	console.log(sqlString);
	db.query(sqlString, (err, result) => {
	if (err) {
		return callback(err);
	}
		callback(result);
	});
},

users.checkUsername = function(username) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) as count FROM Users WHERE username = ?';
    
    db.query(query, [username], (err, results) => {
      if (err) {
        return reject(err);
      }
      
      // If count > 0, username exists
      resolve(results[0].count > 0);
    });
  });
},



module.exports = users;
