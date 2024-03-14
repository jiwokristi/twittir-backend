import bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}

export const comparePassword = async (
  payload: string,
  password: string,
): Promise<boolean> => {
  const passwordsMatch = await bcrypt.compare(payload, password)
  return passwordsMatch
}
