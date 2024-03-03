const mongoose = require('mongoose');

// Define Mongoose schema
const documentSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    document: {
        data: Buffer,
        contentType: String,
        documentUrl: String
    }
},
    {
        timestamps: true
    });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document