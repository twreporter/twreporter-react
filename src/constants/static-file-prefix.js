import { google } from '../conf/storage'
import { replaceStorageUrlPrefix } from '../utils/url'

const IMAGES_FOLDER = 'images'
const googleStorageURLTemplate = `${google.schema}://${google.hostname}/${google.bucket}/${IMAGES_FOLDER}/`

export function storageUrlPrefix(SUBFOLDER_OF_IMAGES) {
  return replaceStorageUrlPrefix(`${googleStorageURLTemplate}${SUBFOLDER_OF_IMAGES}/`)
}
