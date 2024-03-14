import { z } from 'zod'

export const authSchema = z.object({
  username: z
    .string({ required_error: 'Please enter your username.' })
    .min(1, 'Please enter your username.'),
  password: z
    .string({ required_error: 'Please enter your password.' })
    .min(8, 'Password needs to be at least 8 characters long.'),
})
