const products = require("../models/products.model");

const getlistProductInventoryStatus = (req, res) => {
  products.getlistProductInventoryStatus(true, (err, result) => {
    if (err) {
      console.error("Lỗi khi lấy danh sách tồn kho:", err);
      return res.status(500).send("Lỗi server khi lấy danh sách tồn kho!");
    }
    if (!result || result.length === 0) {
      return res.status(404).send("Không có dữ liệu.");
    }

    // console.log("Kết quả tồn kho:", result);
    res.json(result);  // Trả về kết quả dưới dạng JSON
  });
};

const getBestSelling = (req, res) => {
  products.getBestSelling((err, result) => {
    if (err) {
      console.error("Lỗi khi lấy products:", err);
      return res.status(500).send("Lỗi server khi lấy danh sách sản phẩm!");
    }
    // console.log("products:", result);
    res.json(result);
  });
};

module.exports = {
  getlistProductInventoryStatus,
  getBestSelling,
  getAll: (req, res) => {
    products.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy products:", err);
        return res.status(500).send("Lỗi server khi lấy danh sách sản phẩm!");
      }
      // console.log("products:", result);
      res.json(result);
    });
  },

  getAllAttribute: (req, res) => {
    products.getAllAttribute((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy products:", err);
        return res.status(500).send("Lỗi server khi lấy danh sách sản phẩm!");
      }
      // console.log("products:", result);
      res.json(result);
    });
  },

  getAllVariant: (req, res) => {
    products.getAllVariant((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy products:", err);
        return res.status(500).send("Lỗi server khi lấy danh sách sản phẩm!");
      }
  
      // Tạo đối tượng nhóm theo product_id
      const productsById = {};
  
      result.forEach(product => {
        // Kiểm tra nếu product_id đã tồn tại trong đối tượng
        if (!productsById[product.product_id]) {
          // Nếu chưa tồn tại, tạo một đối tượng mới cho sản phẩm
          productsById[product.product_id] = {
            product_id: product.product_id,
            product_name: product.product_name,
            brand_name: product.brand_name,
            model: product.model,
            description: product.description,
            category_name: product.category_name,
            base_price: product.base_price,
            is_featured: product.is_featured,
            variants: [] // Tạo một mảng chứa các biến thể (variants)
          };
        }
  
        // Tách variant_attributes thành JSON
        const attributes = product.variant_attributes.split(',').reduce((acc, attribute) => {
          const [key, value] = attribute.split(':').map(item => item.trim());
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        }, {});
  
        // Thêm variant vào sản phẩm tương ứng
        productsById[product.product_id].variants.push({
          variant_id: product.variant_id,
          variant_sku: product.variant_sku,
          final_price: product.final_price,
          stock_quantity: product.stock_quantity,
          is_default: product.is_default,
          variant_image: product.variant_image,
          variant_attributes: attributes,  // Thêm thuộc tính tách ra dưới dạng JSON
          is_featured: product.is_featured,
          created_at: product.created_at
        });
      });
  
      // Chuyển đối tượng thành mảng và trả về dưới dạng JSON
      const response = Object.values(productsById);
      res.json(response);
    });
  },  

  getById: (req, res) => {
    const id = req.params.id;
    products.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy products theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy thông tin sản phẩm theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy sản phẩm với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const productsData = req.body;
    products.insert(productsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm products:", err);
        return res.status(500).send("Lỗi server khi thêm sản phẩm}!");
      }
      return res.status(200).json({
        message: `Sản phẩm mới đã được thêm thành công.`,
        productsdt: productsData
      });
    });
  },

  update: (req, res) => {
    const productsData = req.body;
    const id = req.params.id;
    products.update(id, productsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật products:", err);
        return res.status(500).send("Lỗi server khi cập nhật products!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    products.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa products:", err);
        return res.status(500).send("Lỗi server khi xóa products!");
      }
      return res.status(200).send({ message: "Xóa thành công", id: id });
    });
  },

};
