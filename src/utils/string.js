/**
 *
 *
 * @export
 * @param {string} str
 * @param {number} hanCharactersLimit - Ex: '中文' includes 2 han characters
 * @returns {string}
 */
export function shortenString(str, hanCharactersLimit) {
  if (typeof str !== 'string') return str
  const charCount = str.length
  if (charCount < hanCharactersLimit) return str
  // Cut input string if needed:
  const limitInBytes = (hanCharactersLimit - 1) * 3
  let resultString = ''
  let byteLength = 0
  for (let i = 0; i < charCount; i += 1) {
    const charBytes = charCodeByteCount(str.charCodeAt(i))
    if (byteLength + charBytes > limitInBytes) {
      resultString += '…'
      break
    }
    resultString += str[i]
    byteLength += charBytes
  }
  return resultString
}

/**
 * Ref: https://stackoverflow.com/a/23329386/5814542
 *
 * @param {number} charCode
 * @return {number}
 */
function charCodeByteCount(charCode) {
  if (charCode > 0x7f && charCode <= 0x7ff) {
    return 2
  }
  if (charCode > 0x7ff && charCode <= 0xffff) {
    return 3
  }
  if (charCode >= 0xdc00 && charCode <= 0xdfff) {
    return 0
  }
  return 1
}
