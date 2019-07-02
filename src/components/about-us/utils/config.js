import * as storage from '@twreporter/core/lib/constants/storage'

const IMAGES_FOLDER = 'images'
const ABOUTUS_FOLDER = 'about-us'

export const storageUrlPrefix = `${storage.google.schema}://${storage.google.hostname}/${storage.google.bucket}/${IMAGES_FOLDER}/${ABOUTUS_FOLDER}`
