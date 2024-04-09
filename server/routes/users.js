import express from 'express'
import { getUser } from '../controllers/users.js'

const router = express.Router()
router.get('/:user_login', getUser)

export default router