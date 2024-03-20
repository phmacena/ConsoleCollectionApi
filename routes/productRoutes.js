const express = require('express');
const productController = require('../controller/productController');
const documentController = require('../controller/documentController');
const multer = require('multer');


const router = express.Router();
// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/product', (req, res) => {productController.createProduct(req, res)});
router.post('/documents/:productId', upload.single('document'), (req, res) => {const productId = req.params.productId; documentController.createDocument(productId, req, res)});
router.get('/product', (req, res) => {productController.getProduct(req, res)});
router.get('/product/:id', (req, res) => {productController.getProductById(req, res)});
router.get('/documents/:id', (req, res) => {documentController.getDocumentById(req, res)});
router.delete('/product/:id', (req, res) => {productController.deleteProductById(req, res)});
router.delete('/documents/:id', (req, res) => {documentController.deleteDocumentById(req, res)});
router.put('/product/:id', (req, res) => {productController.updateProductById(req, res)});

module.exports = router;