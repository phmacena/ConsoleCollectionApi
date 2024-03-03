const mongoose = require('mongoose');
const Joi = require('joi');

// Define Mongoose schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    versions: {
        versionName: {
            type: String,
            required: false
        },
        versionReleaseDate: {
            type: Date,
            required: false
        }
    }
},
    {
        timestamps: true
    });

const Product = mongoose.model('Product', productSchema);

// Compile the Mongoose schema into a Joi model in order to validate the request body in the productController.js file
const joiCreateProductSchema = Joi.object({
    name: Joi.string().required(),
    model: Joi.string().required(),
    releaseDate: Joi.date().required(),
    manufacturer: Joi.string().required(),
    versions: Joi.object({
        versionName: Joi.string(),
        versionReleaseDate: Joi.date()
    })
});
const joiUpdateProductSchema = Joi.object({
    name: Joi.string().forbidden(),
    model: Joi.string(),
    releaseDate: Joi.date(),
    manufacturer: Joi.string(),
    versions: Joi.object({
        versionName: Joi.string(),
        versionReleaseDate: Joi.date()
    })
});
module.exports = { Product, joiCreateProductSchema, joiUpdateProductSchema };