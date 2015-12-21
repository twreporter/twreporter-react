export const ts2yyyymmdd = (ts, separator) => {
  let date = new Date(ts)
  let year = date.getFullYear()
  let mon = date.getMonth() + 1
  let day = date.getDate()
  return [ year, mon, day ].join(separator)
}
