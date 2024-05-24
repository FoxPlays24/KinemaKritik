import express from 'express'
import { getSearch } from '../controllers/search.js'

const router = express.Router()

router.get('/search', getSearch)

export default router