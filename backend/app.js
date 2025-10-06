var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const mysql = require('mysql2');
var cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config()

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Middleware
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Lắng nghe trên cổng 3000
const port = 5000;
app.listen(port, function() {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

// Cấu hình kết nối MySQL sử dụng connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',       
  password: 'Qhuy204',
  database: 'newcomputerstore', 
  waitForConnections: true,
  connectionLimit: 10, // Số lượng kết nối tối đa
  queueLimit: 0        // Không giới hạn số lượng kết nối trong hàng đợi
});


// Route Trang chủ
app.get('/', (req, res) => {
  res.render('index', { title: 'Trang Chủ' });
});

// Đảm bảo đường dẫn đúng và các file tồn tại
var feedbacksRouter = require('./routes/feedbacks.route');
app.use('/feedbacks', feedbacksRouter);

var feedback_imagesRouter = require('./routes/feedback_images.route');
app.use('/feedback_image', feedback_imagesRouter);

var cartRouter = require('./routes/cart.route');
app.use('/cart', cartRouter);

var categoriesRouter = require('./routes/categories.route');
app.use('/categories', categoriesRouter);

var order_itemsRouter = require('./routes/order_items.route');
app.use('/order_items', order_itemsRouter);

var ordersRouter = require('./routes/orders.route');
app.use('/orders', ordersRouter);

var payment_methodsRouter = require('./routes/payment_methods.route');
app.use('/payment_methods', payment_methodsRouter);

var attribute_typesRouter = require('./routes/attribute_types.route');
app.use('/attribute_types', attribute_typesRouter);

var attribute_valuesRouter = require('./routes/attribute_values.route');
app.use('/attribute_values', attribute_valuesRouter);

var Variant_Attribute_ValuesRouter = require('./routes/variant_attribute_values.route');
app.use('/variant_attribute_values', Variant_Attribute_ValuesRouter);

var product_imagesRouter = require('./routes/product_images.route');
app.use('/product_images', product_imagesRouter);

var product_variantsRouter = require('./routes/product_variants.route');
app.use('/product_variants', product_variantsRouter);

var productsRouter = require('./routes/products.route');
app.use('/products', productsRouter);

var brandRouter = require('./routes/brand.route');
app.use('/brand', brandRouter);

var user_addressesRouter = require('./routes/user_addresses.route');
app.use('/user_addresses', user_addressesRouter);

var usersRouter = require('./routes/users.route');
app.use('/users', usersRouter);

var Product_SpecificationsRouter = require('./routes/product_specifications.route');
app.use('/Product_Specifications', Product_SpecificationsRouter);

var Category_AttributesRouter = require('./routes/Category_Attributes.route');
app.use('/Category_Attributes', Category_AttributesRouter);

const uploadRouter = require('./routes/cloudinary-upload');
app.use('/uploads', uploadRouter);

const tagsRouter = require('./routes/tags.route');
app.use('/tags', tagsRouter);

const blogsRouter = require('./routes/blogs.route');
app.use('/blogs', blogsRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  console.error('Error details:', err); // Log chi tiết lỗi

  // Trả về JSON response thay vì render view
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports = app;
