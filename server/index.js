import 'dotenv/config'

import express from 'express'

import cors from 'cors'
  
import authRoutes     from './routes/auth.js'
import filmRoutes     from './routes/films.js'
import userRoutes     from './routes/users.js'
import reviewRoutes   from './routes/reviews.js'
import replyRoutes    from './routes/replies.js'
import genreRoutes    from './routes/genres.js'
import miscRoutes     from './routes/misc.js'
import passwordRoutes from './routes/password.js'

const app = express()

app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({limit: '10mb', extended: true}))
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))

app.use(authRoutes)
app.use(filmRoutes)
app.use(userRoutes)
app.use(reviewRoutes)
app.use(replyRoutes)
app.use(genreRoutes)
app.use(miscRoutes)
app.use(passwordRoutes)

const port = process.env.PORT
app.listen(port, () => console.log(`Server is listening to port ${port}`))