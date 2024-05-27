import express from 'express'
import { changePassword, compareCodes, compareLoginPassword } from '../controllers/password.js'

const router = express.Router()

router.get('/compare/code',      compareCodes)
router.post('/compare',          compareLoginPassword)
router.patch("/password/change", changePassword)

export default router