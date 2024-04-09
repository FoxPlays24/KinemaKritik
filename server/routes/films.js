import express from 'express'
import { getFilms, getFilm, getGenres, getReviews, getUserReview, getFilmLikes, getFilmLiked, likeFilm } from '../controllers/films.js'

const router = express.Router()
router.get('/', getFilms)
router.get('/:film_id', getFilm)
router.get('/:film_id/genres', getGenres)
router.get('/:film_id/reviews', getReviews)
router.get('/:film_id/review/:user_id', getUserReview)
router.get('/:film_id/likes', getFilmLikes)
router.get('/:film_id/liked/:user_id', getFilmLiked)
router.post('/like', likeFilm)

export default router