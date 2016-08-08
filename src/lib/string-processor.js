export const shortenString = (str, maxLen) => {
  if(str.length > maxLen) {
    return str.substr(0, maxLen-1)+'...'
  }
  return str
}
