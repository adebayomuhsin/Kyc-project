// Serve index.html as the homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (!file.mimetype.startsWith('image/')) {
            cb(new Error('Only image files are allowed!'), false);
        } else {
            cb(null, true);
        }
    }
});

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to handle KYC form submission
app.post('/submit-kyc', upload.single('passport'), (req, res) => {
    // Check if the file was uploaded
    if (!req.file) {
        return res.status(400).send('File upload failed. Please upload a valid passport photo.');
    }
    
    // Check for other required fields
    const { name, bvn, nin, address } = req.body;
    if (!name || !bvn || !nin || !address) {
        return res.status(400).send('All fields are required.');
    }

    // Process the form data
    console.log('KYC Form Submitted');
    console.log('Name:', name);
    console.log('BVN:', bvn);
    console.log('NIN:', nin);
    console.log('Address:', address);
    console.log('Uploaded File:', req.file.path);

    res.status(200).send('KYC form submitted successfully.');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const kycRoutes = require('./routes/kycRoutes');

// Load environment variables from .env
dotenv.config();

// Connect to database (if using one)
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use KYC routes
app.use('/kyc', kycRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

