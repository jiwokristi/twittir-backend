import { NextFunction, Request, Response } from 'express'

import { verifyToken } from '@/utils/helpers/jwt'

import { CustomError } from './errorHandler'

export default async function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { accessToken } = req.headers

    if (typeof accessToken === 'string') {
      const tokenVerified = verifyToken(accessToken as string)

      if (!tokenVerified) {
        throw new CustomError(401, 'Please login first.')
      }

      // @ts-ignore
      req.user = tokenVerified.user
      next()
    }

    throw new CustomError(401, 'Please login first.')
  } catch (error) {
    console.log('ERROR MIDDLEWARE AUTH ----->', error)
    if (error instanceof CustomError) {
      res.status(error.code).json({
        error: error.message,
      })
    }
  }
}
