export const round = (value: number, scale: number) => {
  return Math.round(value * 10 ** scale) / 10 ** scale
}
