const Document = require('../models/documentSchema');
const { v4: uuidv4 } = require('uuid');

function createDocument(productId, req, res) {
  //Validating query parameter
  if (!req.query.productId || Object.keys(req.query).length > 1) {
    return res.status(400).json({
      'error': 'Please provide a valid query parameter'
    })
  };
  //Validating document file
  if (!req.file) {
    return res.status(400).json({
      'error': 'Missing document file'
    })
  };
  //Validating file size
  const maxFileSizeBytes = 10 * 1024 * 1024;
  if (req.file.size > maxFileSizeBytes) {
    return res.status(400).json({
      'error': 'File size exceeds the maxium allowed size of 10MB'
    })
  };
  //Validating file format
  const allowedFormats = ['image/jpeg', 'image/png']
  if (!allowedFormats.includes(req.file.mimetype)) {
    return res.status(400).json({
      'error': 'File format must be image/jpeg or image/png'
    })
  }
  // Generate a UUIDv4
  const documentPath = uuidv4();
  const documentUrl = `http://localhost:3000/v1/${documentPath}`
  const document = new Document({
    productId: productId,
    document: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      documentUrl: documentUrl
    }
  });
  document.save()
    .then((result) => {
      console.log('document created:', result);
      const contentType = result.document.contentType
      const documentUrl = result.document.documentUrl
      const documentId = result._id
      res.status(201).json({ message: 'Document created successfully', documentId, contentType, documentUrl });
    })
    .catch((err) => {
      console.error('Error creating document:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
};
function getDocumentById(req, res) {
  //Validating query parameter
  if (!req.query.id || Object.keys(req.query).length > 1) {
    return res.status(400).json({
      'error': 'Please provide a valid query parameter'
    });
  }
  const id = req.query.id;
  Document.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'Document not found' });
      } else {
        res.setHeader('Content-Type', result.document.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="consoleimage.jpg"`);
        res.status(200).send(result.document.data);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
function deleteDocumentById(req, res) {
  //Validating query parameter
  if (!req.query.id || Object.keys(req.query).length > 1) {
    return res.status(400).json({
      'error': 'Please provide a valid query parameter'
    });
  }
  const id = req.query.id
  Document.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'Document not found' });
      } else {
        res.status(200).json({ message: 'Document deleted successfully' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

module.exports = {
  createDocument,
  getDocumentById,
  deleteDocumentById
}