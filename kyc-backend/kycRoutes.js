// routes/kycRoutes.js
const express = require('express');
const kycController = require('../controllers/kycController');
const fileUpload = require('../middlewares/fileUpload');

const router = express.Router();

// Route for submitting KYC form
router.post('/submit', fileUpload.single('passport'), kycController.submitKYC);

module.exports = router;
