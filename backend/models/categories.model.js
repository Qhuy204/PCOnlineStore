const db = require("../common/db");

const categories = function (categories) {
	this.category_name = categories.category_name;
	this.description = categories.description;

};

// Lấy categories theo ID
categories.getById = (id, callback) => {
    const sqlString = "SELECT * FROM categories WHERE category_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Lấy tất cả categories
categories.getAll = (callback) => {
    const sqlString = "SELECT * FROM View_Category_Attributes";
    db.query(sqlString, (err, results) => {
      if (err) {
        return callback(err);
      }
  
      // Group by category_id
      const categoriesMap = new Map();
  
      results.forEach(row => {
        const {
          category_id,
          category_name,
          description,
          attribute_type_id,
          type_name,
          is_required,
          attribute_value_id,
          value_name
        } = row;
  
        // Layer 1: Category
        if (!categoriesMap.has(category_id)) {
          categoriesMap.set(category_id, {
            category_id,
            category_name,
            description,
            attributes: []
          });
        }
  
        const category = categoriesMap.get(category_id);
  
        // Layer 2: Attributes (grouped by attribute_type_id)
        let attribute = category.attributes.find(attr => attr.attribute_type_id === attribute_type_id);
  
        if (!attribute) {
          attribute = {
            attribute_type_id,
            type_name,
            is_required: !!is_required,
            values: []
          };
          category.attributes.push(attribute);
        }
  
        // Layer 3: Values
        if (attribute_value_id && !attribute.values.some(val => val.attribute_value_id === attribute_value_id)) {
          attribute.values.push({
            attribute_value_id,
            value_name
          });
        }
      });
  
      const finalResult = Array.from(categoriesMap.values());
      callback(null, finalResult);
    });
  };

// Thêm categories mới
categories.insert = (newcategories, callback) => {
    const sqlString = "INSERT INTO categories SET ?";
    db.query(sqlString, newcategories, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newcategories });
    });
};

// Cập nhật thông tin categories
categories.update = (id, categoriesData, callback) => {
    const sqlString = "UPDATE categories SET ? WHERE category_id = ?";
    db.query(sqlString, [categoriesData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);

    });
};

// Xóa categories
categories.delete = (id, callback) => {
    const sqlString = "DELETE FROM categories WHERE category_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
        return callback(null, res);
    });
};

module.exports = categories;
