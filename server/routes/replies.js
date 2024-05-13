import express from 'express'
import { getReplies, reply } from '../controllers/replies.js'

const router = express.Router()

router.get('/replies', getReplies)
router.post('/reply', reply)

export default router