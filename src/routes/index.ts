import express from 'express'

import { authenticate, register } from '@/controllers/auth'

import userRoutes from './user'

const router = express.Router()

router
  .post('/register', register)
  .post('/authenticate', authenticate)
  .use('/user', userRoutes)

export default router
