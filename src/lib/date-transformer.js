export const date2yyyymmdd = (time, separator) => {
  const date = new Date(time)
  const year = date.getFullYear()
  const mon = date.getMonth() + 1
  const day = date.getDate()
  return [ year, mon, day ].join(separator)
}
