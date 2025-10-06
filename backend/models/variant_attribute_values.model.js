const db = require("../common/db");

class VariantAttributeValues {
    constructor() {}

    // Get variant attribute values by variant ID and attribute value ID
    static getById(variantId, attributeValueId, callback) {
        // const sqlString = "SELECT * FROM variant_attribute_values WHERE variant_id = ? AND attribute_value_id = ?";
        const sqlString = "SELECT * FROM variant_attribute_values WHERE variant_id = ?";

        db.query(sqlString, [variantId, attributeValueId], (err, result) => {
            if (err) {
                return callback(err);
            }
            // Return first result or null if no results found
            callback(null, result[0] || null);
        });
    }

    // Get all variant attribute values
    static getAll(callback) {
        const sqlString = "SELECT * FROM variant_attribute_values";
        db.query(sqlString, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    }

    // Insert new variant attribute values
    static insert(newVariantAttributeValues, callback) {
        const sqlString = "INSERT INTO variant_attribute_values SET ?";
        db.query(sqlString, newVariantAttributeValues, (err, res) => {
            if (err) {
                return callback(err);
            }
            callback(null, { 
                id: res.insertId, 
                ...newVariantAttributeValues 
            });
        });
    }

    // Update variant attribute values
    static update(variantId, attributeValueId, variantAttributeValuesData, callback) {
        const sqlString = "UPDATE variant_attribute_values SET ? WHERE variant_id = ?";
        db.query(sqlString, [variantAttributeValuesData, variantId, attributeValueId], (err, res) => {
            if (err) {
                return callback(err);
            }
            // Check if any rows were actually updated
            if (res.affectedRows === 0) {
                return callback(new Error('No matching record found to update'));
            }
            callback(null, res);
        });
    }

    // Delete variant attribute values
    static delete(variantId, attributeValueId, callback) {
        const sqlString = "DELETE FROM variant_attribute_values WHERE variant_id = ?";
        db.query(sqlString, [variantId, attributeValueId], (err, res) => {
            if (err) {
                return callback(err);
            }
            // Check if any rows were actually deleted
            if (res.affectedRows === 0) {
                return callback(new Error('No matching record found to delete'));
            }
            callback(null, res);
        });
    }
}

module.exports = VariantAttributeValues;