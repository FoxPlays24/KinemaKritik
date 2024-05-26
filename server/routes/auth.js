import express from 'express'
import { register, login, compareLoginPassword } from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/compare', compareLoginPassword)

export default router