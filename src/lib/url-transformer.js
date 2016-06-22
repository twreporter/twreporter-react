import { basePath } from './constants'

export const getAbsPath = (pathname='', search='') => {
  return basePath + pathname + search
}
