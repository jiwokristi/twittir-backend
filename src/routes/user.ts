import express from 'express'

import { followUser, getUser, getUsers } from '@/controllers/user'

const router = express.Router()

router
  .get('/', getUsers)
  .get('/:id', getUser)
  .put('/:id/follow/:userId', followUser)

export default router
