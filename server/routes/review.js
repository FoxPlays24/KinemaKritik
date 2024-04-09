
import express from 'express'
import { getReviewLikes, likeReview, getReviewLiked, review, reviewRemove } from '../controllers/review.js'

const router = express.Router()
router.get('/:review_id/likes', getReviewLikes)
router.post('/like', likeReview)
router.get('/:review_id/liked/:user_id', getReviewLiked)
router.post('/', review)
router.post('/remove/', reviewRemove)

export default router