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

const uploadTableName = 'uploads'

const createUploadTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS ${uploadTableName} (
        fileid INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) UNIQUE,
        fileType VARCHAR(50) UNIQUE,
        userId INT,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
    `;

    db.query(sql, (error, result) => {
        if (error) {
            console.log('Error creating upload table: ', error);
        } else {
            console.log('upload table created');
        }
    });
};


module.exports = {
    tableName: uploadTableName,
    createUploadTable,
}