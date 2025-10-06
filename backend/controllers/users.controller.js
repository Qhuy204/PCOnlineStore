const users = require("../models/users.model");
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const SEC_CRE = 'Aogk235@b$fts';

const getNhanvien = (req, res) => {
  // Truy vấn nhân viên có quyền admin
  users.getNhanvien(true, (err, result) => {
    if (err) {
      console.error("Lỗi khi lấy danh sách nhân viên:", err);
      return res.status(500).send("Lỗi server khi lấy danh sách nhân viên!");
    }

    // Kiểm tra nếu result không phải là undefined và có dữ liệu
    if (!result || result.length === 0) {
      return res.status(404).send("Không có nhân viên nào.");
    }

    console.log("Kết quả nhân viên:", result);
    res.json(result);  // Trả về kết quả dưới dạng JSON
  });
};

const getlistOrders = (req, res) => {
  users.getlistOrders(true, (err, result) => {
    if (err) {
      console.error("Lỗi khi lấy danh sách nhân viên:", err);
      return res.status(500).send("Lỗi server khi lấy danh sách khách hàng!");
    }

    // Kiểm tra nếu result không phải là undefined và có dữ liệu
    if (!result || result.length === 0) {
      return res.status(404).send("Không tìm thấy danh sách khách hàng.");
    }

    console.log("Kết quả nhân viên:", result);
    res.json(result);  // Trả về kết quả dưới dạng JSON
  });
};

module.exports = {
  getNhanvien,
  getlistOrders,
  login: (req, res) => {
    const {username, password} = req.body;
    users.login(username, password, (result) => {
        console.log(result);
        if(result && result.length > 0){
            const tokenPayload = {
                user_id: result[0].user_id,
                username: result[0].username,
                is_admin: result[0].is_admin === 1 ? 1 : 0  
            };

            var token = jwt.sign(
                tokenPayload, 
                SEC_CRE, 
                { expiresIn: '1h' }  
            );

            console.log('Generated Token Payload:', tokenPayload);
            
            res.json({
                success: true,
                token: token,
                user: result[0]
            });
        }
        else {
            res.status(401).json({
                success: false, 
                message: "Thông tin đăng nhập không đúng"
            });
        }
    });
},

  logout: (req, res) => {
    try {
        // Hủy token ở phía server (nếu sử dụng blacklist token)
        // Hoặc đơn giản là trả về response để client xóa token

        res.json({
            success: true,
            message: 'Đăng xuất thành công'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi đăng xuất'
        });
    }
  },

  register: (req, res) => {
    const userData = req.body;

    // Mã hóa mật khẩu bằng md5
    const hashedPassword = md5(userData.password);

    const userDataWithHashedPass = {
      ...userData,
      password: hashedPassword,
      is_admin: false,
      registration_date: new Date(),
      last_login: new Date()
    };

    users.insert(userDataWithHashedPass, (err, result) => {
      if (err) {
        console.error("Lỗi khi đăng ký user:", err);
        
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({
            success: false,
            message: 'Tên đăng nhập hoặc email đã tồn tại'
          });
        }

        return res.status(500).json({
          success: false,
          message: 'Lỗi server khi đăng ký tài khoản'
        });
      }

      const tokenPayload = {
        user_id: result.insertId,
        username: userData.username,
        is_admin: 0
      };

      const token = jwt.sign(
        tokenPayload, 
        SEC_CRE, 
        { expiresIn: '1h' }
      );

      return res.status(201).json({
        success: true,
        message: 'Đăng ký thành công',
        token: token,
        user: {
          ...userDataWithHashedPass,
          user_id: result.insertId
        }
      });
    });
  },

  getAll: (req, res) => {
    users.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy users:", err);
        return res.status(500).send("Lỗi server khi lấy danh sách khách hàng}!");
      }
      // console.log("users:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    
    // Validate if id is a number - handle different input types
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return res.status(400).send("ID người dùng không hợp lệ. ID phải là một số.");
    }
    
    users.getById(numericId, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy users theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy user theo ID!");
      }
      
      // Kiểm tra kết quả trước khi truy cập thuộc tính length
      if (!result) {
        return res.status(404).send("Không tìm thấy user với ID: " + numericId);
      }
      
      // Check if result is an array
      if (Array.isArray(result)) {
        if (result.length === 0) {
          return res.status(404).send("Không tìm thấy user với ID: " + numericId);
        }
        res.json(result[0]); // Return the first user if it's an array
      } else {
        // If it's a single object, return it directly
        res.json(result);
      }
    });
  },

  getOrdersByUserID: (req, res) => {
    const id = req.params.id;
    
    // Validate user ID is numeric
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return res.status(400).send("ID người dùng không hợp lệ. ID phải là một số.");
    }
    
    users.getOrdersByUserID(numericId, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy orders theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy orders theo userID!");
      }
      
      // Always check if result exists before accessing properties
      if (!result) {
        return res.status(404).send("Không tìm thấy orders với userID: " + numericId);
      }
      
      // If result is an array
      if (Array.isArray(result)) {
        if (result.length === 0) {
          return res.status(404).send("Không tìm thấy orders với userID: " + numericId);
        }
      }
      
      res.json(result);
    });
  },

  insert: (req, res) => {
    const usersData = req.body;
    users.insert(usersData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm users:", err);
        return res.status(500).send("Lỗi server khi thêm khách hàng}!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${usersData.user_id || result.insertId} đã được thêm thành công.`,
        usersdt: usersData
      });
    });
  },

  update: (req, res) => {
    const usersData = req.body;
    const id = req.params.id;
    
    // Validate the ID
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return res.status(400).send("ID người dùng không hợp lệ. ID phải là một số.");
    }
    
    users.update(numericId, usersData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật users:", err);
        return res.status(500).send("Lỗi server khi cập nhật users!");
      }
      return res.status(200).json({
        message: `Admin với ID ${numericId} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    
    // Validate the ID
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return res.status(400).send("ID người dùng không hợp lệ. ID phải là một số.");
    }
    
    users.delete(numericId, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa users:", err);
        return res.status(500).send(`Lỗi server khi xóa user_id = ${numericId}!`);
      }
      // Trả về response thành công
      return res.status(200).send({ message: "Xóa thành công", id: numericId });
    });
  },

  checkUsername: async (req, res) => {
    try {
      const { username } = req.params;
      
      if (!username) {
        return res.status(400).json({
          success: false,
          message: 'Username is required'
        });
      }
      
      const exists = await users.checkUsername(username);
      
      return res.status(200).json({
        success: true,
        exists: exists
      });
    } catch (error) {
      console.error('Error checking username:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};