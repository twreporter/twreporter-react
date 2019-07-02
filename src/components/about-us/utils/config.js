import { storage } from '@twreporter/react-components/lib/shared/configs'

const IMAGES_FOLDER = 'images'
const ABOUTUS_FOLDER = 'about-us'

export const storageUrlPrefix = `${storage.google.schema}://${storage.google.hostname}/${storage.google.bucket}/${IMAGES_FOLDER}/${ABOUTUS_FOLDER}`
