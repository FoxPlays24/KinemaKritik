import mysql from 'mysql2'

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000oooo',
    database: 'kinemakritik'
}).promise()

export default db