const VariantAttributeValues = require("../models/variant_attribute_values.model");

module.exports = {
    // Get all variant attribute values
    getAll: (req, res) => {
        VariantAttributeValues.getAll((err, result) => {
            if (err) {
                console.error("Error retrieving variant attribute values:", err);
                return res.status(500).json({
                    error: true,
                    message: "Server error while retrieving variant attribute values"
                });
            }
            res.status(200).json(result);
        });
    },

    // Get variant attribute values by ID
    getById: (req, res) => {
        const { variantId, attributeValueId } = req.params;
        
        VariantAttributeValues.getById(variantId, attributeValueId, (err, result) => {
            if (err) {
                console.error("Error retrieving variant attribute values by ID:", err);
                return res.status(500).json({
                    error: true,
                    message: "Server error while retrieving variant attribute values"
                });
            }
            
            if (!result) {
                return res.status(404).json({
                    error: true,
                    message: `Variant attribute values not found for variant ID ${variantId} and attribute value ID ${attributeValueId}`
                });
            }
            
            res.status(200).json(result);
        });
    },

    // Insert new variant attribute values
    insert: (req, res) => {
        const variantAttributeValuesData = req.body;
        
        // Basic validation
        if (!variantAttributeValuesData || Object.keys(variantAttributeValuesData).length === 0) {
            return res.status(400).json({
                error: true,
                message: "Invalid input data"
            });
        }

        VariantAttributeValues.insert(variantAttributeValuesData, (err, result) => {
            if (err) {
                console.error("Error inserting variant attribute values:", err);
                return res.status(500).json({
                    error: true,
                    message: "Server error while inserting variant attribute values"
                });
            }
            
            res.status(201).json({
                message: "Variant attribute values added successfully",
                data: result
            });
        });
    },

    // Update variant attribute values
    update: (req, res) => {
        const { variantId, attributeValueId } = req.params;
        const variantAttributeValuesData = req.body;
        
        // Basic validation
        if (!variantAttributeValuesData || Object.keys(variantAttributeValuesData).length === 0) {
            return res.status(400).json({
                error: true,
                message: "Invalid input data"
            });
        }

        VariantAttributeValues.update(variantId, attributeValueId, variantAttributeValuesData, (err, result) => {
            if (err) {
                console.error("Error updating variant attribute values:", err);
                
                // Differentiate between not found and other errors
                if (err.message === 'No matching record found to update') {
                    return res.status(404).json({
                        error: true,
                        message: `Variant attribute values not found for variant ID ${variantId} and attribute value ID ${attributeValueId}`
                    });
                }
                
                return res.status(500).json({
                    error: true,
                    message: "Server error while updating variant attribute values"
                });
            }
            
            res.status(200).json({
                message: "Variant attribute values updated successfully",
                data: result
            });
        });
    },

    // Delete variant attribute values
    delete: (req, res) => {
        const { variantId, attributeValueId } = req.params;

        VariantAttributeValues.delete(variantId, attributeValueId, (err, result) => {
            if (err) {
                console.error("Error deleting variant attribute values:", err);
                
                // Differentiate between not found and other errors
                if (err.message === 'No matching record found to delete') {
                    return res.status(404).json({
                        error: true,
                        message: `Variant attribute values not found for variant ID ${variantId} and attribute value ID ${attributeValueId}`
                    });
                }
                
                return res.status(500).json({
                    error: true,
                    message: "Server error while deleting variant attribute values"
                });
            }
            
            res.status(200).json({
                message: "Variant attribute values deleted successfully",
                data: { variantId, attributeValueId }
            });
        });
    }
};