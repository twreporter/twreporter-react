import { paths } from '../constants/customized-article-path'

const REMOVE_NUMBER_FROM_START = 3

// substring remove /a/
export const twrSubstring = (s) => {
  if (s) {
    return s.substring(REMOVE_NUMBER_FROM_START)
  }
  return s
}

const recognizer = (params, pathname) => {
  for (let path of paths) {
    if (path === pathname) {
      return {
        slug: pathname
      }
    }
  }
  return params
}

export default recognizer
