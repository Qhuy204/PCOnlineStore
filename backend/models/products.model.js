const db = require("../common/db");

const products = function (products) {
	this.category_id = products.category_id;
	this.product_name = products.product_name;
	this.brand_name = products.brand_name;
	this.model = products.model;
	this.description = products.description;
	this.base_price = products.base_price;
	this.is_featured = products.is_featured;
	this.created_at = products.created_at;

};


// Lấy products theo ID
products.getById = (id, callback) => {
    const sqlString = "SELECT * FROM View_Product_Variant_Details WHERE product_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }

        // Tạo đối tượng để chứa thông tin sản phẩm
        const product = {
            product_id: result[0].product_id,
            product_name: result[0].product_name,
            brand_name: result[0].brand_name,
            model: result[0].model,
            base_price: result[0].base_price,
            description: result[0].description,
            category_name: result[0].category_name,
            variants: []
        };

        // Lặp qua các variant và nhóm vào mảng variants
        result.forEach(item => {
            const variant = {
                variant_id: item.variant_id,
                variant_sku: item.variant_sku,
                final_price: item.final_price,
                stock_quantity: item.stock_quantity,
                is_default: item.is_default,
                variant_image: item.variant_image,
                variant_attributes: item.variant_attributes,
                is_featured: item.is_featured,
                created_at: item.created_at
            };

            // Thêm biến thể vào danh sách variants
            product.variants.push(variant);
        });

        // Trả về kết quả đã nhóm theo cấu trúc JSON nested
        callback(null, product);
    });
};


// Lấy tất cả products
products.getAll = (callback) => {
    const sqlString = "SELECT * FROM View_Product_Inventory_Status";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả products kèm variant
products.getAllVariant = (callback) => {
    const sqlString = "SELECT * FROM View_Product_Variant_Details";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

//Lấy tất cả Product kèm attribute
products.getAllAttribute = (callback) => {
    const sqlString = "SELECT * FROM Product_Attributes_View";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm products mới
products.insert = (newproducts, callback) => {
    const sqlString = "INSERT INTO products SET ?";
    db.query(sqlString, newproducts, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newproducts });
    });
};

// Cập nhật thông tin products
products.update = (id, productsData, callback) => {
    const sqlString = "UPDATE products SET ? WHERE product_id = ?";
    db.query(sqlString, [productsData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

// Xóa products
products.delete = (id, callback) => {
    const sqlString = "DELETE FROM products WHERE product_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

// Lấy danh sách bán chạy
products.getBestSelling = (callback) => {
    const sqlString = "SELECT * FROM ViewBestSellingProducts";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};
module.exports = products;
