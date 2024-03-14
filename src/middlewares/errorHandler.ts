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
        res.status(409).json({
          status: 409,
          error: `Unique constraint error in: ${(
            error.meta?.target as string[]
          )?.join(', ')}.`,
        })
        break
      case 'P2025':
        // Error from the child ID not being found.
        res.status(404).json({
          status: 404,
          error:
            'An operation failed because it depends on one or more records that were required but not found. Expected 1 records to be connected, found only 0.',
        })
        break
      case 'P2016':
        // Error from the parent ID not being found.
        res.status(404).json({
          status: 404,
          error:
            'Required exactly one parent ID to be present for connect query, found 0.',
        })
        break
      case 'P2024':
        res
          .status(408)
          .json({ status: 408, error: 'Request Timeout. Please try again.' })
        break

      default:
        res.status(500).json({
          status: 500,
          error:
            'We apologize, but it appears that something unexpected occurred.',
        })
        break
    }
  } else if (error instanceof CustomError) {
    switch (error.code) {
      case 400:
        res.status(400).json({ status: 400, error: error.message })
        break
      case 401:
        res.status(401).json({ status: 401, error: error.message })
        break
      case 404:
        res.status(404).json({ status: 404, error: error.message })
        break
      case 409:
        res.status(409).json({ status: 409, error: error.message })
        break

      default:
        res.status(500).json({
          status: 500,
          error:
            'We apologize, but it appears that something unexpected occurred.',
        })
        break
    }
  }
}

export default errorHandler
