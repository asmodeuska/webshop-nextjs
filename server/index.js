const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const fb = require('./middleware/firebase');
const inventory = require('./controller/inventory');
const path = require("path");
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


var multer = require('multer');
var upload = multer();
var storage = multer.memoryStorage(); 
var upload = multer({ storage: storage });

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.post('/api/login', fb.login, );

app.post('/api/addItem', fb.authenticate, upload.single('image'), inventory.addItem);
app.get('/api/getItems', inventory.getItems);
app.get('/api/getItem/:id', inventory.getItem);

app.post('/api/addCategory', fb.authenticate, inventory.addCategory);
app.post('/api/getCategories', fb.authenticate, inventory.getCategories);
app.post('/api/getCategory', fb.authenticate, inventory.getCategory);
app.post('/api/updateCategory', fb.authenticate, inventory.updateCategory);
app.post('/api/deleteCategory', fb.authenticate, inventory.deleteCategory);

app.post('/api/getAttributes', fb.authenticate, inventory.getAttributes);
app.post('/api/getAttributesByCategory', fb.authenticate, inventory.getAttributesByCategory);
app.post('/api/addAttributes', fb.authenticate, inventory.addAttributes);
app.post('/api/deleteAttributes', fb.authenticate, inventory.deleteAttributes);

app.post('/api/addRating', inventory.addRating);

app.post('/api/authenticate', fb.authenticate, function (req, res) {
	res.send()
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port: ${process.env.PORT}`);
});