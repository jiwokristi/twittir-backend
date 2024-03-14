import jwt from 'jsonwebtoken'

const SECRET_KEY: string = process.env.SECRET_KEY!

export const signToken = (payload: { id: string }) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY)
}
