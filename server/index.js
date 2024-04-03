import express from 'express'
import cors from 'cors'

import filmsRoutes from './routes/films.js'

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use('/films', filmsRoutes)

const port = 80
app.listen(80, () => { 
    console.log(`Server is listening to http://localhost:${port}/`)
})