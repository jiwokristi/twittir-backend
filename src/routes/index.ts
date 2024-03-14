import express from 'express'

import { authenticate, register } from '@/controllers/auth'

const router = express.Router()

router.post('/register', register).post('/authenticate', authenticate)

export default router
