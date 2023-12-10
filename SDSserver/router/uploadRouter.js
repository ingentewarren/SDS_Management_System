const express = require('express');
const cors = require('cors');
const { uploadFile, isAuthenticated } = require('../controller/uploadController');
const router = express.Router();


router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

router.post('/upload', uploadFile);

module.exports = router;
