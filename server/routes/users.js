import express from 'express'
import { editUser, getUser } from '../controllers/users.js'

const router = express.Router()
router.get('/:user_login', getUser)
router.patch('/edit', editUser)

export default router