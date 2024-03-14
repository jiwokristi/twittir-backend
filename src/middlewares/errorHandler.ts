import { NextFunction, Request, Response } from 'express'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export class CustomError extends Error {
  code: number

  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}

const errorHandler = (
  error: CustomError | PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('ERROR ----->', error)
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        res
          .status(409)
          .json({ error: 'Sorry, that username is not available.' })
        break

      default:
        res.status(500).json({
          error:
            'We apologize, but it appears that something unexpected occurred.',
        })
        break
    }
  } else if (error instanceof CustomError) {
    switch (error.code) {
      case 400:
        res.status(400).json({ error: error.message })
        break
      case 401:
        res.status(401).json({ error: error.message })
        break

      default:
        res.status(500).json({
          error:
            'We apologize, but it appears that something unexpected occurred.',
        })
        break
    }
  }
}

export default errorHandler
