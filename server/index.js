import express from 'express'
import cors from 'cors'

import filmsRoutes from './routes/films.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(cookieParser())

app.use('/films', filmsRoutes)
app.use(authRoutes)

const port = 80
app.listen(80, () => { 
    console.log(`Server is listening to http://localhost:${port}/`)
})