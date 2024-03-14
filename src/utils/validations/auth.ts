import { z } from 'zod'

export const userSchema = z.object({
  username: z.string().min(1, 'Please enter your username.'),
  password: z
    .string()
    .min(8, 'Password needs to be at least 8 characters long.'),
})
