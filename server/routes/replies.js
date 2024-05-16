import express from 'express'
import { getReplies, reply, replyDelete } from '../controllers/replies.js'

const router = express.Router()

router.get('/replies', getReplies)
router.post('/reply', reply)
router.delete('/reply', replyDelete)

export default router