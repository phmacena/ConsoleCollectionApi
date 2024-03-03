const Document = require('../models/documentSchema');

const createDocument = function (productId, req, res) {
    const documentPath = `${Math.floor(Math.random() * 10)}.jpg`
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
        res.status(201).json({ message: 'Document created successfully' });
      })
      .catch((err) => {
        console.error('Error creating document:', err);
        res.status(500).json({ error: 'Internal server error' });
      });
  };
  const getDocumentById = function (req, res) {
    const id = req.params.id;
    Document.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'Document not found'});
      } else {
        res.setHeader('Content-Type', 'image/jpeg');
        res.status(200).send(Document.data);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  };
  const deleteDocumentById = function (req, res) {
    const id = req.params.id
    Document.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'Document not found'});
      } else {
        res.status(200).json({ message: 'Document deleted successfully'});
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