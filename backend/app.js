const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const path = require('path');

// CORS middleware
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

// Middleware parse body JSON
app.use(express.json());

// Gắn router
const route = require('./routes/route');
app.use('/api/v1', route);

// Export app cho test
module.exports = app;
