import express from 'express'
import { editUser, getUser } from '../controllers/users.js'

const router = express.Router()

router.get('/user', getUser)
router.patch("/user/edit", editUser)

export default router