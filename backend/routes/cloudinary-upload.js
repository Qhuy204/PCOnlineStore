const express = require('express');
const router = express.Router();
const fileUploader = require('../configs/cloudinary.config');

router.post('/cloudinary-upload', fileUploader.single('file'), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }
 
    // Sử dụng secure_url từ Cloudinary thay vì req.file.path
    res.json({ 
      secure_url: req.file.path || req.file.location,
      message: 'Upload successful' 
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;