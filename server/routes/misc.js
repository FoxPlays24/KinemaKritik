import express from 'express'
import { getPosts, getSearch } from '../controllers/misc.js'

const router = express.Router()

router.get('/search', getSearch)
router.get('/posts', getPosts)

export default router