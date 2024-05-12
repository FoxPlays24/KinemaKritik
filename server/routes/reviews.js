import express from 'express'
import { getReviews, getReviewVoted, getReviewVotes, review, reviewRemove, voteReview } from '../controllers/reviews.js'

const router = express.Router()

router.get('/reviews',      getReviews)
router.get('/review/votes', getReviewVotes)
router.get('/review/voted', getReviewVoted)

router.post('/review/vote',   voteReview)
router.post('/review',        review)
router.post('/review/remove', reviewRemove)

export default router