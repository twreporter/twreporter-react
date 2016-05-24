export const date2yyyymmdd = (time, separator) => {
  let date = new Date(time)
  let year = date.getFullYear()
  let mon = date.getMonth() + 1
  let day = date.getDate()
  return [ year, mon, day ].join(separator)
}
