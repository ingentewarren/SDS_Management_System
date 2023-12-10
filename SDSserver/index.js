const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');
// const path = require('path');
// const session = require('express-session');
// const flash = require('connect-flash');
// const passport = require('./helper/passport-config');
const auth = require('./router/authRouter');
const uploadFile = require('./router/uploadRouter');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config();

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'entercore123',
    database: 'sds',
    port: '3306',
    insecureAuth: true,
});

db.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
    } else {
        console.log('Connected to MySQL database');
    }
});

// app.use(session({
//     secret: process.env.JWT_SECRET,
//     resave: true,
//     saveUninitialized: true
// }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', auth);
app.use('/file', uploadFile);

app.listen(8000, () => {
    console.log('Connected to server success');
});
