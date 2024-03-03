const { Product, joiCreateProductSchema, joiUpdateProductSchema } = require('../models/productSchema');

const createProduct = function (req, res) {
  // Validate Request Body Parameters
  const validationResult = joiCreateProductSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.details });
  }
  // Continuing
  const product = new Product(req.body);
  product.save()
    .then((result) => {
      console.log('Product created:', result);
      res.status(201).json({ message: 'Product created successfully', product: result });
    })
    .catch((err) => {
      console.error('Error creating product:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
};
const getProduct = function (req, res) {
  Product.find().sort({ createdAt: -1 })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
const getProductById = function (req, res) {
  const id = req.params.id;
  Product.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
const updateProductById = function (req, res) {
  // Validate Request Body Parameters
  const validationResult = joiUpdateProductSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.details });
  }
  // Continuing
  const id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'Product not found' });
      }
      else {
        res.status(200).json({ message: 'Product updated successfully', product: result });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
const deleteProductById = function (req, res) {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(200).json({ message: 'Product deleted successfully' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  deleteProductById,
  updateProductById
}