const mysql = require('mysql');
const uploadModel = require('../model/uploadModel');
const userModel = require('../model/userModel')
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'entercore123',
    database: 'sds',
    port: '3306',
    insecureAuth: true,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single('file'); 

const uploadFile = (req, res) => {
    const { userId } = req.user;

    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            try {
                console.log('File uploaded successfully!');
                // Call the function to create the upload table if not already created
                await uploadModel.createUploadTable();

                // Access file details through req.file
                const { filename, originalname, mimetype, size } = req.file;
                const { fileType } = req.body;

                // Insert file details into the database or perform other actions
                const sql = `INSERT INTO ${uploadModel.tableName} (filename, originalname, mimetype, size, fileType, userId) VALUES (?, ?, ?, ?, ?, ?)`;
                db.query(sql, [filename, originalname, mimetype, size, fileType, userId], (dbErr, result) => {
                    if (dbErr) {
                        console.error('Error uploading file to database:', dbErr);
                        res.status(500).json({ message: 'Internal Server Error' });
                    } else {
                        // Include informative response with file details
                        res.json({
                            message: 'File uploaded successfully!',
                            fileDetails: { filename, originalname, mimetype, size, fileType, userId },
                        });
                    }
                });
            } catch (error) {
                console.error('Error creating upload table:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    });
};

module.exports = {
    uploadFile,
};

