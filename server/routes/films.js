import express from 'express'
import { getFilmGenres, getFilmReviewsCount, getFilmVoted, getFilmVotes, getFilms, voteFilm } from '../controllers/films.js'

const router = express.Router()

router.get('/films',       getFilms)
router.get('/film/genres', getFilmGenres)
router.get('/film/votes',  getFilmVotes)
router.get('/film/voted',  getFilmVoted)
router.get('/film/reviews',  getFilmReviewsCount)
router.post('/film/vote',  voteFilm)

export default router