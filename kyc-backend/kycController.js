// controllers/kycController.js
exports.submitKYC = (req, res) => {
    const { name, bvn, nin, address } = req.body;
    const passport = req.file;

    // Ensure all fields are provided
    if (!name || !bvn || !nin || !address || !passport) {
        return res.status(400).send('All fields are required.');
    }

    // Log the submitted data (replace with database save logic as needed)
    console.log('KYC form submitted:', { name, bvn, nin, address, passportPath: passport.path });

    res.status(200).send('KYC form submitted successfully.');
};
