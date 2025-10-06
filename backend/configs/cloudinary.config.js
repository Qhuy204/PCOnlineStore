const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config(); // Đảm bảo gọi .env

cloudinary.config({
  cloud_name: 'dcl5bi2jy',
  api_key: '288962933737841',
  api_secret: 'V7wdRF_6RbG5mcupMyET22nt75A',
});

console.log(cloudinary.config().cloud_name); 


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'product_images', // hoặc folder tuỳ chọn
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg'],
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
