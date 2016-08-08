import { basePath } from '../constants/index'

export const getAbsPath = (pathname='', search='') => {
  return basePath + pathname + search
}
