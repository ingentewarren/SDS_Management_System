const express = require('express');
const cors = require('cors');
const router = express.Router();
const {
    test,
    registerUser,
    loginUser,
    getProfile,
    getUser,
} = require('../controller/authController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

router.get('/', test);
router.get('/profile', getProfile);
router.get('/register', getUser);

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
