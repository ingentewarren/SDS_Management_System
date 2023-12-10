const mysql = require('mysql');

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

const userTableName = 'users';

const createUserTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS ${userTableName} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstname VARCHAR(255) UNIQUE,
            lastname VARCHAR(255) UNIQUE,
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255) UNIQUE
        )
    `;

    db.query(sql, (error, result) => {
        if (error) {
            console.error('Error creating users table:', error);
        } else {
            console.log('Users table created');
        }
    });
};


module.exports = {
    tableName: userTableName,
    createUserTable // Call the function to create the table when the application starts
    // Add other functions as needed
};
