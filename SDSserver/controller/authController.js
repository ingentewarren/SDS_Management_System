const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

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

const test = (req, res) => {
    res.json('test is working');
};

const registerUser = async (req, res) => {
    try {
        userModel.createUserTable();
        console.log(req.body); // Log the entire request body
        const { firstname, lastname, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        if (!firstname || !lastname || !email || !password || password.length < 6) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const existQuery = 'SELECT * FROM users WHERE email = ?';
        db.query(existQuery, [email], async (error, results) => {
            if (error) {
                console.error('Error checking if email exists:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'Email is already taken' });
            }

            const createUserQuery = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
            db.query(createUserQuery, [firstname, lastname, email, hashPassword], (createError, result) => {
                if (createError) {
                    console.error('Error registering user:', createError);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                res.json({ message: 'User registered successfully' });
            });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const getUserQuery = 'SELECT * FROM users WHERE email = ?';
        db.query(getUserQuery, [email], async (error, results) => {
            if (error) {
                console.error('Error getting user:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'No user found' });
            }

            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                jwt.sign(
                    { email: user.email, id: user.id, firstname: user.firstname },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' },
                    (err, token) => {
                        if (err) {
                            console.error('Error creating JWT token:', err);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }

                        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
                        res.json({ message: 'Log in success' });
                    }
                );
            } else {
                res.status(401).json({ error: 'Password is invalid' });
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUser = (req, res) => {
    const getUsersQuery = 'SELECT * FROM users';
    db.query(getUsersQuery, (error, results) => {
        if (error) {
            console.error('Error getting users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
};

const getProfile = (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json(null);
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(401).json({ error: 'Invalid token' });
        }

        res.json(user);
    });
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getUser,
    getProfile,
};
