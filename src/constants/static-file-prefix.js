import { SITE_META } from '../constants/site-meta'

const IMAGES_FOLDER = 'images'
const storageURLTemplate = `${SITE_META.URL_NO_SLASH}/${IMAGES_FOLDER}/`

export function storageUrlPrefix(SUBFOLDER_OF_IMAGES) {
  return `${storageURLTemplate}${SUBFOLDER_OF_IMAGES}/`
}
