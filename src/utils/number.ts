export const roundNumber = (num: number) => {
  if (num === 0) return num

  return Math.round(num * 100) / 100
}
