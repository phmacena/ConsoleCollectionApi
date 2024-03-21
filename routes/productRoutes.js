const express = require('express');
const productController = require('../controller/productController');
const documentController = require('../controller/documentController');
const multer = require('multer');


const router = express.Router();
// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/product', (req, res) => {productController.createProduct(req, res)});
router.post('/document', upload.single('document'), (req, res) => {const productId = req.query.productId; documentController.createDocument(productId, req, res)});
router.get('/products', (req, res) => {productController.getProducts(req, res)});
router.get('/product', (req, res) => {productController.getProductById(req, res)});
router.get('/document', (req, res) => {documentController.getDocumentById(req, res)});
router.delete('/product', (req, res) => {productController.deleteProductById(req, res)});
router.delete('/document', (req, res) => {documentController.deleteDocumentById(req, res)});
router.put('/product', (req, res) => {productController.updateProductById(req, res)});

module.exports = router;