import express from 'express'
import cors from 'cors'

import filmsRoutes from './routes/films.js'
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import reviewRoutes from './routes/review.js'

import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({limit: '10mb', extended: true}))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(cookieParser())

app.use('/films', filmsRoutes)
app.use(authRoutes)
app.use('/users', usersRoutes)
app.use('/review', reviewRoutes)

const port = 3001
app.listen(port, () => { 
    console.log(`Server is listening to http://localhost:${port}/`)
})