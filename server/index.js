import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000oooo',
    database: 'kinemakritik'
})
db.connect(function(err) {
    if(err) throw err
    else console.log('Database successfully connected')
})

const port = 80
app.listen(port, () => { 
    console.log(`Server is listening to http://localhost:${port}/`)
})