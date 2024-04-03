import express from 'express'
import { getFilms, getFilm, getGenres } from '../controllers/films.js'

const router = express.Router()
router.get('/', getFilms)
router.get('/:film_id', getFilm)
router.get('/:film_id/genres', getGenres)

export default router