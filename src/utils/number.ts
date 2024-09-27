import { generateSecureToken } from 'n-digit-token'

export const roundNumber = (num: number) => {
  if (num === 0) return num

  return Math.round(num * 100) / 100
}

export const generateToken = (digits: number) => {
  return generateSecureToken(6)
}
