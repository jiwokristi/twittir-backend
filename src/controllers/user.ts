import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

import { CustomError } from '@/middlewares/errorHandler'

const prisma = new PrismaClient()

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await prisma.user.findMany()

    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        followings: true,
        followers: true,
      },
    })

    if (!user) {
      throw new CustomError(404, `User with ID: ${id} is not found.`)
    }

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const followUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, userId } = req.params

    const alreadyFollowing = await prisma.user.findUnique({
      where: {
        id,
        followings: {
          some: {
            id: userId,
          },
        },
      },
    })

    if (alreadyFollowing) {
      const unfollow = await prisma.user.update({
        where: { id },
        data: {
          followings: {
            disconnect: { id: userId },
          },
        },
      })

      res
        .status(200)
        .json({ message: 'Successfully unfollowed user.', ...unfollow })
      return
    }

    const follow = await prisma.user.update({
      where: { id },
      data: {
        followings: {
          connect: { id: userId },
        },
      },
    })

    res.status(200).json({ message: 'Successfully followed user.', ...follow })
  } catch (error) {
    next(error)
  }
}
