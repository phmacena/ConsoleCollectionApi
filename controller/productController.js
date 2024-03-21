const { Product, joiCreateProductSchema, joiUpdateProductSchema } = require('../models/productSchema');

function createProduct(req, res) {
  //Validating query parameter
  if (Object.keys(req.query).length > 0) {
    return res.status(400).json({ error: "Query parameters are not allowed for this endpoint" });
  }
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
function getProducts(req, res) {
  //Validating query parameter
  if (Object.keys(req.query).length > 0) {
    return res.status(400).json({ error: "Query parameters are not allowed for this endpoint" });
  }
  Product.find().sort({ createdAt: -1 })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
function getProductById(req, res) {
  //Validating query parameter
  if (!req.query.id || Object.keys(req.query).length > 1) {
    return res.status(400).json({
      'error': 'Please provide a valid query parameter'
    });
  }

  const id = req.query.id;

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
function updateProductById(req, res) {
  //Validating query parameter
  if (!req.query.id || Object.keys(req.query).length > 1) {
    return res.status(400).json({
      'error': 'Please provide a valid query parameter'
    });
  }

  // Validate Request Body Parameters
  const validationResult = joiUpdateProductSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.details });
  }
  // Continuing
  const id = req.query.id;
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
function deleteProductById(req, res) {
  //Validating query parameter
  if (!req.query.id || Object.keys(req.query).length > 1) {
    return res.status(400).json({
      'error': 'Please provide a valid query parameter'
    });
  }
  const id = req.query.id;
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
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById
}