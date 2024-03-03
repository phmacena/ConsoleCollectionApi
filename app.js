const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

// Connect to MongoDB
const dbURI = 'mongodb+srv://phmacena:teste123@inventorymanagementapi.gx0cih4.mongodb.net/InventoryManagementAPI';
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server Listening On Port 3000')
    });
  })
  .catch((err) => console.log(err));

// Middleware Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1', productRoutes);

module.exports = app;